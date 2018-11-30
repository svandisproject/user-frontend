import {Injectable} from '@angular/core';
import {Web3Config} from '../../config/Web3Config';
import {Web3Interface} from './Web3Interface';
import Web3 from 'web3';
import {BehaviorSubject, Observable} from 'rxjs';
import {BlockchainApiService} from '../../common/blockchain/service/BlockchainApiService';

@Injectable({
    providedIn: 'root'
})
export class Web3Service {
    public walletStatus = new BehaviorSubject(false);
    private web3: Web3Interface;
    private readonly SIGN_NEW_USER = 'CREATE NEW ACCOUNT';
    private readonly SIGN_DECENTRALIZATION = 'CONVERT DECENTRALIZED';
    private readonly SIGN_NEW_SVANDIS_DATA = JSON.stringify({
        token: 'SVN',
        supply: 400000000
    });

    walletStatus$ = this.walletStatus.asObservable();

    constructor(private blockchainApiService: BlockchainApiService) {
        this.web3 = new Web3(Web3Config.LOCAL_HOST_RPC);
        this.clearWallet();
        const privateKeyEncrypted = this.getKeyEncrypted();
        if (privateKeyEncrypted) {
            this.walletStatus.next(true);
        }
    }

    public signNewUser(password: string): Observable<string> {
        return Observable.of(this.signData(this.SIGN_NEW_USER, password));
    }

    public signSvandisData(password: string): Observable<string> {
        return Observable.of(this.signData(this.SIGN_NEW_SVANDIS_DATA, password));
    }

    public convertCentralized(password: string): Observable<string> {
        return Observable.of(this.signData(this.SIGN_DECENTRALIZATION, password));
    }


    public signData(dataString: string, password: string): string {
        const privateKeyEncrypted = this.getKeyEncrypted();
        const privateKey = this.decryptKey(privateKeyEncrypted, password);
        const signed = this.web3.eth.accounts.sign(
            dataString, privateKey.privateKey);
        const signature = signed.signature;
        // Here we prove we can get back our address
        const sigRecovery = this.web3.eth.accounts.recover(dataString, signature);
        if (sigRecovery === privateKey.address) {
            return signature;
        } else {
            return 'No Signature';
        }
    }

    public createNewWalletAndStoreKey(isExpert: boolean, password: string, recoveryAddress?: string) {
        this.web3.eth.accounts.wallet.clear();
        localStorage.removeItem(Web3Config.ENCRYPTED_PRV_KEY);
        this.web3.eth.accounts.wallet.create(1, 'entropy');
        const encryptedPrivateKey = this.web3.eth.accounts.wallet.encrypt(password);
        const walletString = JSON.stringify(encryptedPrivateKey[0]);
        localStorage.setItem(Web3Config.ENCRYPTED_PRV_KEY, walletString);
        this.walletStatus.next(true);
        this.signNewUser(password).subscribe(returnedSig => {
                if (isExpert) {
                    this.blockchainApiService.blockchainUser(
                        returnedSig, recoveryAddress
                    ).subscribe((response) => console.log(response));
                } else {
                    this.blockchainApiService.blockchainCentralizedUser(
                        returnedSig
                    ).subscribe((response) => console.log(response));
                }
            }
        );
    }

    private decryptKey(privateKeyEncrypted, password: string) {
        return this.web3.eth.accounts.decrypt(privateKeyEncrypted, password);
    }

    private getKeyEncrypted() {
        return localStorage.getItem(Web3Config.ENCRYPTED_PRV_KEY);
    }

    private clearWallet() {
        this.web3.eth.accounts.wallet.clear();
    }

    public resetThis() {
        this.web3.eth.accounts.wallet.clear();
        localStorage.removeItem(Web3Config.ENCRYPTED_PRV_KEY);
        this.walletStatus.next(false);
    }

    public downloadMyKeystore() {
        const keystore = this.getKeyEncrypted();
        if (keystore) {
            const data = this.getKeyEncrypted();
            const blob = new Blob([data], {type: 'text/csv'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }
    }

    public isEthereumAddress(address: string): boolean {
        return this.web3.utils.isAddress(address);
    }

    public convertBeginnerToExpertUser(password: string, userNewRecoveryAddress: string) {
        this.convertCentralized(password).subscribe(returnedSig => {
                    this.blockchainApiService.convertBlockchainBeginnerCentralizedUser(
                        returnedSig, userNewRecoveryAddress
                    ).subscribe((response) => console.log(response));
            }
        );
    }
}
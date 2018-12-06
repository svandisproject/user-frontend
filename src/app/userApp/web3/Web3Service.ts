import {Injectable} from '@angular/core';
import {Web3Config} from '../../config/Web3Config';
import {Web3Interface} from './Web3Interface';
import Web3 from 'web3';
import {BehaviorSubject, Observable} from 'rxjs';
import {BlockchainApiService} from '../../common/blockchain/service/BlockchainApiService';
import {UserAuthService} from '../../common/user/UserAuthService';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class Web3Service {
    public walletStatus = new BehaviorSubject(false);
    private web3: Web3Interface;
    private readonly SIGN_NEW_USER = 'CREATE NEW ACCOUNT';
    private readonly SIGN_DECENTRALIZATION = 'CONVERT DECENTRALIZED';
    private readonly SIGN_NEW_DEVICE = 'SIGN NEW DEVICE';
    private readonly SIGN_SWAP_DEVICE = 'SWAP NEW DEVICE';
    private readonly SIGN_NEW_SVANDIS_DATA = JSON.stringify({
        token: 'SVN',
        supply: 400000000
    });

    private userId: string;
    walletStatus$ = this.walletStatus.asObservable();

    constructor(private blockchainApiService: BlockchainApiService, private userAuthService: UserAuthService) {
        this.web3 = new Web3(Web3Config.TEST_HOST_RPC);
        this.clearWallet();
        this.userAuthService.getCurrentUser().subscribe(user => {
            this.userId = user.id;
            const privateKeyEncrypted = this.getKeyEncrypted();
            if (privateKeyEncrypted) {
                this.walletStatus.next(true);
            }
        });
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

    public signToAddThisDevice(password: string): Observable<string> {
        return Observable.of(this.signData(this.SIGN_NEW_DEVICE, password));
    }

    public signToSwapAllToThisDevice(password: string): Observable<string> {
        return Observable.of(this.signData(this.SIGN_SWAP_DEVICE, password));
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

    private getEncryptedPrivateAddressLocation(): string {
        return Web3Config.ENCRYPTED_PRV_KEY + this.userId;
    }

    public isOnboarded(): boolean {
        if (localStorage.getItem(this.getEncryptedPrivateAddressLocation())) {
            return true;
        } else {
            return false;
        }
    }

    public createNewWalletAndStoreKey(isExpert: boolean, password: string, recoveryAddress?: string) {
        if (this.userId) {
            this.web3.eth.accounts.wallet.clear();
            localStorage.removeItem(this.getEncryptedPrivateAddressLocation());
            this.web3.eth.accounts.wallet.create(1, 'entropy');
            const encryptedPrivateKey = this.web3.eth.accounts.wallet.encrypt(password);
            const walletString = JSON.stringify(encryptedPrivateKey[0]);
            localStorage.setItem(this.getEncryptedPrivateAddressLocation(), walletString);
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
    }

    private decryptKey(privateKeyEncrypted, password: string) {
        return this.web3.eth.accounts.decrypt(privateKeyEncrypted, password);
    }

    private getKeyEncrypted() {
        return localStorage.getItem(this.getEncryptedPrivateAddressLocation());
    }

    private clearWallet() {
        this.web3.eth.accounts.wallet.clear();
    }

    public resetThis() {
        this.web3.eth.accounts.wallet.clear();
        localStorage.removeItem(this.getEncryptedPrivateAddressLocation());
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

    public replaceKeyWithRecovery(myRecoveryString: string): Observable<boolean> {
        // Here we want to double check the key is in fact okay to replace whatever is currently there
        localStorage.removeItem(this.getEncryptedPrivateAddressLocation());
        localStorage.setItem(this.getEncryptedPrivateAddressLocation(), myRecoveryString);
        return Observable.of(true);
    }

    public addDeviceSetupLocalKey(password: string) {
        // Verify there is no key locally matching users key- make sure this device is new.
        // Create a new wallet
        this.web3.eth.accounts.wallet.clear();
        localStorage.removeItem(this.getEncryptedPrivateAddressLocation());
        this.web3.eth.accounts.wallet.create(1, 'entropy');
        const encryptedPrivateKey = this.web3.eth.accounts.wallet.encrypt(password);
        const walletString = JSON.stringify(encryptedPrivateKey[0]);
        localStorage.setItem(this.getEncryptedPrivateAddressLocation(), walletString);
        this.walletStatus.next(true);
        const currentWallet = ''; // Need this value from API
        this.signToAddThisDevice(password).subscribe(returnedSig => {
                    this.blockchainApiService.blockchainUser(
                        currentWallet, returnedSig
                    ).subscribe((response) => console.log(response));
            }
        );
    }

    public swapAllDevicesAndSetupLocalKey(password: string) {
        // Verify there is no key locally matching users key- make sure this device is new.
        // Create a new wallet
        this.web3.eth.accounts.wallet.clear();
        localStorage.removeItem(this.getEncryptedPrivateAddressLocation());
        this.web3.eth.accounts.wallet.create(1, 'entropy');
        const encryptedPrivateKey = this.web3.eth.accounts.wallet.encrypt(password);
        const walletString = JSON.stringify(encryptedPrivateKey[0]);
        localStorage.setItem(this.getEncryptedPrivateAddressLocation(), walletString);
        this.walletStatus.next(true);
        const currentWallet = ''; // Need this value from API
        this.signToSwapAllToThisDevice(password).subscribe(returnedSig => {
                this.blockchainApiService.blockchainUser(
                    currentWallet, returnedSig
                ).subscribe((response) => console.log(response));
            }
        );

    }
}
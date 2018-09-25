import {Injectable} from '@angular/core';
import {Web3Config} from '../../config/Web3Config';
import {Web3Interface} from './Web3Interface';
import Web3 from 'web3';
import {BehaviorSubject, Observable} from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable({
    providedIn: 'root'
})
export class Web3Service {
    private web3: Web3Interface;
    private readonly SIGN_NEW_USER: string = 'CREATE NEW ACCOUNT';
    private readonly SIGN_NEW_SVANDIS_DATA: string = JSON.stringify({
        token: 'SVN',
        supply: 400000000
    });
    public walletStatus = new BehaviorSubject(false);
    walletStatus$ = this.walletStatus.asObservable();
    constructor() {
        this.web3 = new Web3(Web3Config.LOCAL_HOST_RPC);
        this.clearWallet();

         // localStorage.removeItem(Web3Config.ENCRYPTED_PRV_KEY); //Use this to reset testing for encrypted prv key
        const privateKeyEncrypted = this.getKeyEncrypted();
        if (privateKeyEncrypted) {
            this.walletStatus.next(true);
            this.decryptKey(privateKeyEncrypted);
        }
    }
    public signNewUser(isExpert: boolean, recoveryEthAddress: string): Observable<string> {
        if (isExpert) {
            // This will be a variable in the call to the backend, so we know
            // Do something with recovery Eth Address directed to backend as well
        }
        return Observable.of(this.signData(this.SIGN_NEW_USER));
    }
    public signSvandisData(): Observable<string> {
        return Observable.of(this.signData(this.SIGN_NEW_SVANDIS_DATA));
    }
    public signData(dataString: string): string {
        const privateKeyEncrypted = this.getKeyEncrypted();
        const privateKey = this.decryptKey( privateKeyEncrypted);
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
    public createNewWalletAndStoreKey() {
        this.web3.eth.accounts.wallet.create(1, 'entropy');
        const encryptedPrivateKey = this.web3.eth.accounts.wallet.encrypt(Web3Config.PASSWORD);
        const walletString = JSON.stringify(encryptedPrivateKey[0]);
        localStorage.setItem(Web3Config.ENCRYPTED_PRV_KEY, walletString);
        this.walletStatus.next(true);
    }
    private decryptKey(privateKeyEncrypted) {
        return this.web3.eth.accounts.decrypt(privateKeyEncrypted, Web3Config.PASSWORD);
    }
    private getKeyEncrypted() {
        return localStorage.getItem(Web3Config.ENCRYPTED_PRV_KEY);
    }
    private clearWallet() {
        this.web3.eth.accounts.wallet.clear();
    }
}
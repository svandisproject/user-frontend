// Code originally references
// https://github.com/FundRequest/code-snippets/edit/master/angular-smartcontracts/src/app/services/contracts/contracts.service.ts

import {Injectable, OnInit} from '@angular/core';

import Web3 from 'web3';
import {WorkerService} from '../api/services/WorkerService';

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
    private _account: string = null;
    private _web3: any;

    private _password = 'Svandis1';

    private _SIGN_NEW_USER = 'CREATE NEW ACCOUNT';
    private _SIGN_NEW_SVANDIS_DATA = '{"token": "SVN", "supply": "400000000"}';
    private _ENCRYPTED_PRV_KEY = 'ENCRYPTED_PRV_KEY';

    constructor() {
        this._web3 = new Web3('ws://localhost:9545');
        // Clean the wallet and pull it/create it from an encrypted local source
        this._web3.eth.accounts.wallet.clear();
        // localStorage.removeItem(this._ENCRYPTED_PRV_KEY); // use to clear local accounts on localhost
        const privateKeyEncrypted = localStorage.getItem(this._ENCRYPTED_PRV_KEY);
        if (privateKeyEncrypted === null) {
            this._web3.eth.accounts.wallet.create(1);
            const encryptedPrivateKey = this._web3.eth.accounts.wallet.encrypt(this._password);
            console.log(encryptedPrivateKey)
            const walletString = JSON.stringify(encryptedPrivateKey[0]);
            console.log('wallet string ' + walletString);
            localStorage.setItem(this._ENCRYPTED_PRV_KEY, walletString);
        } else {
            this._web3.eth.accounts.decrypt(privateKeyEncrypted, this._password);
        }
    }

    public async signNewUser(): Promise<string> {
        return Promise.resolve(this.signData(this._SIGN_NEW_USER));
    }

    public async signSvandisData(): Promise<string> {
        return Promise.resolve(this.signData(this._SIGN_NEW_SVANDIS_DATA));
    }

    public async signData(dataString: string): Promise<string> {
        const privateKeyEncrypted = localStorage.getItem(this._ENCRYPTED_PRV_KEY);
        const privateKey = this._web3.eth.accounts.decrypt( privateKeyEncrypted , this._password);
        const signed = this._web3.eth.accounts.sign(
            dataString, privateKey.privateKey);
        const signature = signed.signature;
        const hash = signed.messageHash;
        // Lets prove we can get back our address
        const sigRecovery = this._web3.eth.accounts.recover(dataString, signature);
        console.log('Sig recovery is ' + sigRecovery + ' and the public key is ' +
            privateKey.address);
        if (sigRecovery === privateKey.address) {
            return Promise.resolve(signature);
        }
        return null;
    }
}

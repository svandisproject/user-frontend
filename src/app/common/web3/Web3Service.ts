import {Injectable} from '@angular/core';
import {Web3} from './Web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
    private web3: Web3;

    private password = 'Svandis1';

    private readonly SIGN_NEW_USER = 'CREATE NEW ACCOUNT';
    private readonly SIGN_NEW_SVANDIS_DATA = JSON.stringify({
        token: 'SVN',
        supply: 400000000
    });

    private readonly ENCRYPTED_PRV_KEY = 'ENCRYPTED_PRV_KEY';

    constructor() {
        this.web3 = new Web3('ws://localhost:9545');

        this.clearWallet();
        const privateKeyEncrypted = this.getKeyEncrypted();

        if (!privateKeyEncrypted) {
            this.createWalletAndStoreKey();
        } else {
            this.decryptKey(privateKeyEncrypted);
        }
    }

    public async signNewUser(): Promise<string> {
        return Promise.resolve(this.signData(this.SIGN_NEW_USER));
    }

    public async signSvandisData(): Promise<string> {
        return Promise.resolve(this.signData(this.SIGN_NEW_SVANDIS_DATA));
    }

    // TODO: Refactor this method as i did with constructor
    public async signData(dataString: string): Promise<string> {
        const privateKeyEncrypted = localStorage.getItem(this.ENCRYPTED_PRV_KEY);
        const privateKey = this.web3.eth.accounts.decrypt(privateKeyEncrypted, this.password);
        const signed = this.web3.eth.accounts.sign(
            dataString, privateKey.privateKey);
        const signature = signed.signature;
        const hash = signed.messageHash;
        // Lets prove we can get back our address
        const sigRecovery = this.web3.eth.accounts.recover(dataString, signature);
        console.log('Sig recovery is ' + sigRecovery + ' and the public key is ' +
            privateKey.address);
        if (sigRecovery === privateKey.address) {
            return Promise.resolve(signature);
        }
        return null;
    }


    private createWalletAndStoreKey() {
        this.web3.eth.accounts.wallet.create(1);
        const encryptedPrivateKey = this.web3.eth.accounts.wallet.encrypt(this.password);
        const walletString = JSON.stringify(encryptedPrivateKey[0]);
        localStorage.setItem(this.ENCRYPTED_PRV_KEY, walletString);
    }

    private decryptKey(privateKeyEncrypted) {
        this.web3.eth.accounts.decrypt(privateKeyEncrypted, this.password);
    }

    private getKeyEncrypted() {
        return localStorage.getItem(this.ENCRYPTED_PRV_KEY);
    }

    private clearWallet() {
        this.web3.eth.accounts.wallet.clear();
    }
}
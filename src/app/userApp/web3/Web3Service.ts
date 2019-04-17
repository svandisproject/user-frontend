import {Injectable} from '@angular/core';
import {Web3Config} from '../../config/Web3Config';
import {Web3Interface} from './Web3Interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {BlockchainApiService} from '../../common/blockchain/service/BlockchainApiService';
import {UserAuthService} from '../../common/user/UserAuthService';
import {User} from '../../common/api/dataModels/User';
import Web3 from 'web3';

@Injectable({
    providedIn: 'root'
})
export class Web3Service {
    private localKeyConnected = new BehaviorSubject(false);
    private isOnboarded = new BehaviorSubject(false);
    private isCentralized = new BehaviorSubject(false);
    private web3: Web3Interface;
    private readonly SIGN_NEW_USER = 'CREATE NEW ACCOUNT';
    private readonly SIGN_DECENTRALIZATION = 'CONVERT DECENTRALIZED';
    private readonly SIGN_NEW_DEVICE = 'SIGN NEW DEVICE';
    private readonly SIGN_SWAP_DEVICE = 'SWAP NEW DEVICE';
    private readonly SIGN_NEW_SVANDIS_DATA = JSON.stringify({
        token: 'SVN',
        supply: 400000000
    });

    private user: User;

    constructor(private blockchainApiService: BlockchainApiService, private userAuthService: UserAuthService) {
        this.web3 = new Web3(Web3Config.TEST_HOST_RPC);
        this.clearWeb3Wallet();
        this.refreshBlockchainUserState();
    }

    public getLocalKey(): Observable<boolean> {
        return this.localKeyConnected.asObservable();
    }

    public getIsOnboarded(): Observable<boolean> {
        return this.isOnboarded.asObservable();
    }

    public getIsCentralized(): Observable<boolean> {
        return this.isCentralized.asObservable();
    }

    public refreshBlockchainUserState(): void {
        this.userAuthService.getCurrentUser()
            .subscribe((currentUser) => {
                this.user = currentUser;
                if (this.user.onboarded) {
                    this.isOnboarded.next(true);
                }
                if (this.user.centralized) {
                    this.isCentralized.next(true);
                }
                this.localKeyConnected.next(this.getKeyEncryptedLocation() && this.isOnboarded.getValue()); });
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
        const privateKeyEncrypted = this.getKeyEncryptedLocation();
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
        return Web3Config.ENCRYPTED_PRV_KEY + this.user.id;
    }

    public createNewWalletAndStoreKey(isExpert: boolean, password: string, recoveryAddress?: string) {
        if (this.user.id) {
            this.deconstructLocalWalletAndCreateNewOne(password);
            this.signNewUser(password).subscribe((returnedSig) => {
                        this.blockchainApiService.blockchainUser(
                            returnedSig,
                            recoveryAddress
                        )
                            .subscribe((response) => this.localKeyConnected.next(true));
                }
            );
        }
    }

    public resetTheDemo() {
        this.web3.eth.accounts.wallet.clear();
        localStorage.removeItem(this.getEncryptedPrivateAddressLocation());
        if (this.user.id) {
            this.blockchainApiService.resetDemo(this.user.id)
                .subscribe((response) => this.removeApiDataRelatedToDemoAndDisconnect());
        }
    }

    public removeApiDataRelatedToDemoAndDisconnect() {
        this.localKeyConnected.next(false);
        this.isOnboarded.next(false);
        location.reload();
    }

    public downloadMyLocalKeystore() {
        const keystore = this.getKeyEncryptedLocation();
        if (keystore) {
            const data = this.getKeyEncryptedLocation();
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
                    returnedSig,
                    userNewRecoveryAddress
                )
                    .subscribe((response) => this.refreshBlockchainUserState()); });
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
        this.localKeyConnected.next(true);
        const currentWallet = ''; // Need this value from API
        this.signToAddThisDevice(password).subscribe((returnedSig) => {
                    this.blockchainApiService.blockchainUser(
                        currentWallet,
                        returnedSig
                    )
                        .subscribe((response) => this.refreshBlockchainUserState()); });
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
        this.localKeyConnected.next(true);
        const currentWallet = ''; // Need this value from API
        this.signToSwapAllToThisDevice(password).subscribe((returnedSig) => {
                this.blockchainApiService.blockchainUser(
                    currentWallet,
                    returnedSig
                )
                    .subscribe((response) => this.refreshBlockchainUserState()); });
    }

    private deconstructLocalWalletAndCreateNewOne(password: string) {
        this.web3.eth.accounts.wallet.clear();
        localStorage.removeItem(this.getEncryptedPrivateAddressLocation());
        this.web3.eth.accounts.wallet.create(1, 'entropy');
        const encryptedPrivateKey = this.web3.eth.accounts.wallet.encrypt(password);
        const walletString = JSON.stringify(encryptedPrivateKey[0]);
        localStorage.setItem(this.getEncryptedPrivateAddressLocation(), walletString);
    }

    private decryptKey(privateKeyEncrypted, password: string) {
        return this.web3.eth.accounts.decrypt(privateKeyEncrypted, password);
    }

    private getKeyEncryptedLocation() {
        return localStorage.getItem(this.getEncryptedPrivateAddressLocation());
    }

    private clearWeb3Wallet() {
        this.web3.eth.accounts.wallet.clear();
    }

}
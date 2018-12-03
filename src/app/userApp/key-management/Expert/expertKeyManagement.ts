import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../web3/Web3Service';

@Component({
    selector: 'app-rc-expert-key-management',
    templateUrl: './expertKeyManagement.html',
    styles: ['mat-icon {cursor: pointer}'],
    styleUrls: ['./expertKeyManagement.scss']
})

export class ExpertKeyManagementComponent implements OnInit {

    public recoveryAddress = '0x';
    public connectionStatus: boolean;
    constructor(private web3Service: Web3Service) {
        // Use an observable rxjs call to API to decide if this user is centralized or not.
        this.connectionStatus = this.web3Service.walletStatus.getValue();
    }

    ngOnInit() {
    }

    public downloadKeystore(): void {
        this.web3Service.downloadMyKeystore();
    }

    public isValidEthAddress(): boolean {
        return this.web3Service.isEthereumAddress(this.recoveryAddress);
    }

    public setRecoveryAddress(): void {
        // Need to use web3 to interact with the contract
        // Small amount of gas requested from server to carry out operation - limited requests available
    }

    public addDeviceKey(): void {
        // Need to use web3 to interact with the contract
        // Small amount of gas requested from server to carry out operation - limited requests available
    }

    public recoverKeyFromFile(): void {
        // Upload the keystore from another browser to this browser as well and confirm that it is registered on this account
        this.web3Service.replaceKeyWithRecovery();
    }

}
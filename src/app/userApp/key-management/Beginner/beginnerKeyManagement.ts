import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../web3/Web3Service';

@Component({
    selector: 'app-rc-beginner-key-management',
    templateUrl: './beginnerKeyManagement.html',
    styleUrls: ['./beginnerKeyManagement.scss']
})

export class BeginnerKeyManagementComponent {

    public recoveryAddress = '0x';
    public password = '';
    public connectionStatus: boolean;
    constructor(private web3Service: Web3Service) {
        this.web3Service.getLocalKey()
            .subscribe((data) => {this.connectionStatus = data; });
    }

    public downloadKeystore(): void {
        this.web3Service.downloadMyLocalKeystore();
    }

    public isValidEthAddress(): boolean {
        return this.web3Service.isEthereumAddress(this.recoveryAddress);
    }

    public becomeExpertUser(): void {
        return this.web3Service.convertBeginnerToExpertUser(this.password, this.recoveryAddress);
    }

    // These 2 functions require API check for if user is onboarded and whether that key exists here.
    // If not user can add trusted device, or swap all trusted devices for this one.
    public addDeviceKey(password: string): void {
        // Check if the current device has a web3 key matching users ID. If not (this is a new browser)- Activate
        this.web3Service.addDeviceSetupLocalKey(password);
    }

    public swapDeviceForCurrentBrowser(password: string): void {
        // Check if the current device has a web3 key matching users ID. If not (this is a new browser)- Activate
        // This feature can be used to increase security in case users other device has been compromised.
        this.web3Service.swapAllDevicesAndSetupLocalKey(password);
    }
}
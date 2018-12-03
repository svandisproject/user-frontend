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
    public recoveryFileString: string;
    public recoveryModeActive = false;
    constructor(private web3Service: Web3Service) {
        // Use an observable rxjs call to API to decide if this user is centralized or not.
        this.connectionStatus = this.web3Service.walletStatus.getValue();
    }

    ngOnInit() {
        this.web3Service.walletStatus$.subscribe(
        data => {
            this.connectionStatus = data;
        });
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

    public importFile(event) {
        if (event.target.files.length === 0) {
            this.recoveryModeActive = false;
        }
        const fr = new FileReader();
        fr.onload = (e: any) => {
            console.log(e.target.result);
            this.recoveryFileString = e.target.result;
        }
        fr.readAsText(event.target.files[0]);
        this.recoveryModeActive = true;
    }

    public setupRecoveredLocalKey() {
        console.log(this.recoveryFileString);
        this.web3Service.replaceKeyWithRecovery(this.recoveryFileString).subscribe(
            data => {
                console.log(data);
            });
    }
}
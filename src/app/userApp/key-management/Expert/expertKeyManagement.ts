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
    constructor(private web3Service: Web3Service) {
        // Use an observable rxjs call to API to decide if this user is centralized or not.
    }

    ngOnInit() {
    }

    public downloadKeystore(): void {
        this.web3Service.downloadMyKeystore();
    }
}
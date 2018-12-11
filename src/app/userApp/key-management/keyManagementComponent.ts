import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../web3/Web3Service';

@Component({
    selector: 'app-rc-key-management',
    templateUrl: './keyManagement.html',
    styles: ['mat-icon {cursor: pointer}']
})

export class KeyManagementComponent {
    public isCentralized = true;

    constructor(private web3Service: Web3Service) {
        this.web3Service.getIsCentralized().subscribe(
            data => {
                this.isCentralized = data;
            });
    }

    resetDemo() {
        this.web3Service.resetTheDemo();
    }
}
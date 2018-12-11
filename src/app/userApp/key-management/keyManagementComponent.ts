import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../web3/Web3Service';

@Component({
    selector: 'app-rc-key-management',
    templateUrl: './keyManagement.html',
    styles: ['mat-icon {cursor: pointer}']
})

export class KeyManagementComponent implements OnInit {
    public isCentralized = true;

    constructor(private web3Service: Web3Service) {
        // Use an observable rxjs call to API to decide if this user is centralized or not.
        this.web3Service.getIsCentralized().subscribe(
            data => {
                this.isCentralized = data;
            });
    }

    ngOnInit() {
        this.web3Service.isCentralized$.subscribe(data => {
            this.isCentralized = data;
        });
    }

    resetDemo() {
        this.web3Service.resetThis();
    }
}
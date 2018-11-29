import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../web3/Web3Service';

@Component({
    selector: 'app-rc-beginner-key-management',
    templateUrl: './beginnerKeyManagement.html',
    styles: ['mat-icon {cursor: pointer}'],
    styleUrls: ['./beginnerKeyManagement.scss']
})

export class BeginnerKeyManagementComponent implements OnInit {

    constructor(private web3Service: Web3Service) {
        // Use an observable rxjs call to API to decide if this user is centralized or not.
    }

    ngOnInit() {
    }

    public downloadKeystore(): void {
        this.web3Service.downloadMyKeystore();
    }
}
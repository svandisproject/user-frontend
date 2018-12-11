import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../Web3Service';

@Component({
    selector: 'app-eth-connection-prompt',
    templateUrl: 'ethConnectionPrompt.html',
    styleUrls: ['ethConnectionPrompt.scss'],
})
export class EthConnectionPromptComponent implements OnInit  {

    public connectionStatus = false;
    constructor(private web3Service: Web3Service) {
        this.web3Service.getLocalKey().subscribe(
            data => {
                this.connectionStatus = data;
            });
    }

    ngOnInit() {
        this.web3Service.localKeyConnected$.subscribe(
            data => {
                this.connectionStatus = data;
            });
    }
}

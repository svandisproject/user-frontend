import {Component, OnInit} from '@angular/core';
import {Web3Service} from './Web3Service';

@Component({
    selector: 'app-eth-connection-prompt',
    templateUrl: 'ethConnectionPrompt.html',
    styleUrls: ['ethConnectionPrompt.scss'],
})
export class EthConnectionPromptComponent implements OnInit  {

    public connectionStatus = false;
    constructor(private web3Service: Web3Service) {
        this.connectionStatus = this.web3Service.walletStatus.getValue();
    }

    ngOnInit() {
        this.web3Service.walletStatus$.subscribe(
            data => {
                this.connectionStatus = data;
            });
    }
}

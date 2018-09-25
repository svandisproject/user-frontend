import {Component, OnInit} from '@angular/core';
import {Web3Service} from './Web3Service';

/**
 * @title Card with multiple sections
 */
@Component({
    selector: 'app-eth-connection-prompt',
    templateUrl: 'ethConnectionPrompt.html',
    styleUrls: ['ethConnectionPrompt.scss'],
})
export class EthConnectionPromptComponent implements OnInit  {

    public promptTitle = 'No Eth Key Detected';
    constructor(private web3Service: Web3Service) {
        this.promptTitle = this.web3Service.walletStatus.getValue();
    }

    ngOnInit() {
        this.web3Service.walletStatus$.subscribe(
            data => {
                this.promptTitle = data;
            });
    }
}

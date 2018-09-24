import {Component} from '@angular/core';

/**
 * @title Card with multiple sections
 */
@Component({
    selector: 'app-eth-connection-prompt',
    templateUrl: 'ethConnectionPrompt.html',
    styleUrls: ['ethConnectionPrompt.scss'],
})
export class EthConnectionPromptComponent {
    
    public promptTitle = 'No Eth Key Detected';
}

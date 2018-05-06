import {Component} from '@angular/core';
import {GeneralScreenerComponent} from './GeneralScreenerComponent';
import {AltCoinsFilterService} from '../../common/filters/AltCoinsFilterService';

@Component({
    templateUrl: './generalScreener.html'
})
export class AltCoinScreenerComponent extends GeneralScreenerComponent {
    public title = 'SCREENER.ALT.TITLE';

    constructor(public filterService: AltCoinsFilterService) {
        super();
    }
}

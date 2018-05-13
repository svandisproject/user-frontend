import {Component} from '@angular/core';
import {StorageAdapter} from '../../common/localStorage/StorageAdapter';

@Component({
    selector: 'app-screener',
    templateUrl: './generalScreener.html',
})

export class GeneralScreenerComponent {
    public title = 'SCREENER.ICO.TITLE';
    public filterService: StorageAdapter<any>;
}

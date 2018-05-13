import {Component} from '@angular/core';
import {StorageAdapter} from '../../common/localStorage/StorageAdapter';

@Component({
    selector: 'app-screener',
    templateUrl: './generalScreener.html',
    styleUrls: ['./generalScreener.scss']
})

export class GeneralScreenerComponent {
    public title = 'SCREENER.ICO.TITLE';
    public filterService: StorageAdapter<any>;
    public isFilterOpened = false;
}

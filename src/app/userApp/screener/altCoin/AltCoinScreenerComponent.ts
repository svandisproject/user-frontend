import {Component} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {AltCoinsFilterService} from '../../../common/filters/AltCoinsFilterService';
import {PostService} from '../../../common/api/services/PostService';
import {DataTableColumn} from '../../../common/dataTable/DataTableColumn';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {AltCoinMockedDataSet} from './AltCoinMockedDataSet';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class AltCoinScreenerComponent extends GeneralScreenerComponent {
    public title = 'SCREENER.ALT.TITLE';
    public dataSet: Pageable<any> = AltCoinMockedDataSet;

    public testColumns: DataTableColumn[] = [
        {columnName: 'Ticker', columnKey: 'ticker', isHeadColumn: true},
        {columnName: 'Name', columnKey: 'name'},
        {columnName: 'Market Cap', columnKey: 'marketCap'},
        {columnName: 'Price, $', columnKey: 'price'},
        {columnName: 'CHG%', columnKey: 'change', isPositiveHeading: true},
        {columnName: 'CHG% Week', columnKey: 'changeWeek', isPositiveHeading: true},
        {columnName: 'CHG% YTD', columnKey: 'changeYtd', isNegativeHeading: true},
        {columnName: 'Volume, $', columnKey: 'volume'},
    ];

    constructor(public filterService: AltCoinsFilterService, test: PostService) {
        super();
    }
}

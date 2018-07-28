import {Component} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {UserDataTableColumn} from '../UserDataTableColumn';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {AltCoinMockedDataSet} from './AltCoinMockedDataSet';
import {TokenService} from '../../../common/api/services/TokenService';
import {Token} from '../../../common/api/dataModels/Token';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class AltCoinScreenerComponent extends GeneralScreenerComponent {
    public title = 'SCREENER.ALT.TITLE';
    public dataSet: Pageable<Token[]> = AltCoinMockedDataSet;

    public dataTableColumns: UserDataTableColumn[] = [
        {columnName: 'Ticker', columnKey: 'ticker', isHeadColumn: true},
        {columnName: 'Name', columnKey: 'name'},
        {columnName: 'Market Cap', columnKey: 'marketCap'},
        {columnName: 'Price, $', columnKey: 'price'},
        {columnName: 'CHG%', columnKey: 'change', isPositiveHeading: true},
        {columnName: 'CHG% Week', columnKey: 'changeWeek', isPositiveHeading: true},
        {columnName: 'CHG% YTD', columnKey: 'changeYtd', isNegativeHeading: true},
        {columnName: 'Volume, $', columnKey: 'volume'},
    ];

    constructor(private tokenService: TokenService) {
        super();
        this.tokenService.findAll().subscribe();
    }
}

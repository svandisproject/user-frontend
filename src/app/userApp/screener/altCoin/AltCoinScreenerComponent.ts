import {Component} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {AltCoinMockedDataSet} from './AltCoinMockedDataSet';
import {TokenService} from '../../../common/api/services/TokenService';
import {Token} from '../../../common/api/dataModels/Token';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class AltCoinScreenerComponent extends GeneralScreenerComponent {
    public title = 'SCREENER.ALT.TITLE';
    public dataSet: Pageable<Token[]> = AltCoinMockedDataSet;

    public dataTableColumns: GeneralDataTableColumn[] = [
        {columnName: 'Ticker', columnKey: 'ticker'},
        {columnName: 'Name', columnKey: 'name'},
        {columnName: 'Market Cap', columnKey: 'marketCap'},
        {columnName: 'Price, $', columnKey: 'price'},
        {columnName: 'CHG%', columnKey: 'change'},
        {columnName: 'CHG% Week', columnKey: 'changeWeek'},
        {columnName: 'CHG% YTD', columnKey: 'changeYtd'},
        {columnName: 'Volume, $', columnKey: 'volume'},
    ];

    constructor(private tokenService: TokenService) {
        super();
        this.tokenService.findAll().subscribe();
    }
}

import {Component} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {TokenService} from '../../../common/api/services/TokenService';
import {Token} from '../../../common/api/dataModels/Token';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';
import {map} from 'rxjs/operators';
import {PageEvent} from '@angular/material';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class AltCoinScreenerComponent extends GeneralScreenerComponent {
    public title = 'SCREENER.ALT.TITLE';
    public dataSet: Pageable<Token>;

    public dataTableColumns: GeneralDataTableColumn[] = [
        {columnName: 'Ticker', columnKey: 'ticker'},
        {columnName: 'Name', columnKey: 'title'},
        {columnName: 'Market Cap', columnKey: 'market_cap'},
        {columnName: 'Price, $', columnKey: 'price'},
        {columnName: 'CHG%', columnKey: 'change'},
        {columnName: 'CHG% Week', columnKey: 'weekly_change'},
        {columnName: 'CHG% YTD', columnKey: 'year_to_day_change'},
        {columnName: 'Volume, $', columnKey: 'volume'},
    ];

    constructor(private tokenService: TokenService) {
        super();
        this.tokenService.findAll()
            .pipe(map((resp) => this.tokenService.convertPrices(resp)))
            .subscribe((res) => this.dataSet = res);
    }

    public loadPage(pageEvent: PageEvent): void {
        this.tokenService.findBy(null, pageEvent.pageIndex + 1)
            .pipe(map((resp) => this.tokenService.convertPrices(resp)))
            .subscribe((res) => this.dataSet = res);
    }
}

import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {TokenService} from '../../../common/api/services/TokenService';
import {Token} from '../../../common/api/dataModels/Token';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';
import {concatMap, map} from 'rxjs/operators';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {interval} from 'rxjs/internal/observable/interval';

@Component({
    selector: 'app-alt-coin-screener',
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AltCoinScreenerComponent extends GeneralScreenerComponent implements OnInit, OnDestroy {
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

    private readonly PUSHER_EVENT = 'token';
    private readonly PUSHER_CHANNEL = 'token';

    private readonly REQUEST_INTERVAL = 10000;
    private tokenSubscription: Subscription;
    private currentPage = 0;

    constructor(private tokenService: TokenService) {
        super();
        this.tokenService.findAll()
            .pipe(map((resp) => this.tokenService.convertPrices(resp)))
            .subscribe((res) => this.dataSet = res);
    }

    ngOnInit(): void {
        this.tokenSubscription = interval(this.REQUEST_INTERVAL)
            .pipe(concatMap(() => this.loadByPageWithPrices(this.currentPage)))
            .subscribe((res) => this.dataSet = res);
    }

    ngOnDestroy(): void {
        this.tokenSubscription.unsubscribe();
    }

    public loadPage(pageEvent: PageEvent): void {
        this.currentPage = pageEvent.pageIndex;
        this.loadByPageWithPrices(pageEvent.pageIndex)
            .subscribe((res) => this.dataSet = res);
    }

    private loadByPageWithPrices(pageIndex: number) {
        return this.tokenService.findBy(null, pageIndex + 1)
            .pipe(map((resp) => this.tokenService.convertPrices(resp)));
    }
}

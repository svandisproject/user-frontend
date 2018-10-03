import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {TokenService} from '../../../common/api/services/TokenService';
import {Token} from '../../../common/api/dataModels/Token';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {interval} from 'rxjs/internal/observable/interval';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {SortAwarePageEvent} from '../../../common/dataTable/SortAwarePageEvent';

@Component({
    selector: 'app-alt-coin-screener',
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AltCoinScreenerComponent extends GeneralScreenerComponent implements OnInit, OnDestroy {
    public title = 'SCREENER.ALT.TITLE';
    public dataSet: Pageable<Token>;

    public availableDataTableColumns: GeneralDataTableColumn[] = [
        {columnName: 'Ticker', columnKey: 'ticker'},
        {columnName: 'Name', columnKey: 'title'},
        {columnName: 'Market Cap', columnKey: 'market_cap'},
        {columnName: 'Price, $', columnKey: 'price'},
        {columnName: 'CHG%', columnKey: 'change'},
        {columnName: 'CHG% Week', columnKey: 'weekly_change'},
        {columnName: 'CHG% YTD', columnKey: 'year_to_day_change'},
        {columnName: 'Volume, $', columnKey: 'volume'},
    ];
    public dataTableColumns: GeneralDataTableColumn[] = _.clone(this.availableDataTableColumns);

    private readonly REQUEST_INTERVAL = 10000;
    private tokenSubscription: Subscription;

    constructor(private tokenService: TokenService) {
        super();
    }

    ngOnInit(): void {
        this.tokenService.findAll()
            .subscribe((res) => this.dataSet = res);

        this.tokenSubscription = interval(this.REQUEST_INTERVAL)
            .pipe(switchMap(() => this.findToken()))
            .subscribe((res) => this.dataSet = res);
    }

    ngOnDestroy(): void {
        this.tokenSubscription.unsubscribe();
    }

    public loadPage(pageEvent: SortAwarePageEvent): void {
        super.loadPage(pageEvent);
        this.findToken().subscribe((res) => this.dataSet = res);
    }

    private findToken(): Observable<Pageable<Token>> {
        return this.tokenService.findBy(null, this.currentPage, this.sortingOptions);
    }
}

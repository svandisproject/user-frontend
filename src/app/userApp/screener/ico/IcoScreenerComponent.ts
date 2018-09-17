import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {IcoService} from '../../../common/api/services/IcoService';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';
import {Subscription} from 'rxjs/Subscription';
import {PageEvent, Sort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/internal/observable/interval';
import {switchMap} from 'rxjs/operators';
import {Sorting} from '../../../common/api/util/Sorting';
import {NewIco} from '../../../common/api/dataModels/Ico';
import * as _ from 'lodash';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class IcoScreenerComponent extends GeneralScreenerComponent implements OnInit, OnDestroy {
    private currentPage = 1;
    private currentSorting: Sorting;
    private readonly REQUEST_INTERVAL = 10000;
    private icoSubscription: Subscription;

    public dataSet: Pageable<NewIco>;
    public availableDataTableColumns: GeneralDataTableColumn[] = [
        {columnName: 'Remote ID', columnKey: 'remote_id'},
        {columnName: 'Title', columnKey: 'title'},
        {columnName: 'Competitors', columnKey: 'competitors', isArray: true},
        {columnName: 'Country', columnKey: 'country'},
        {columnName: 'Industries', columnKey: 'industries', isArray: true, arrayItemKey: 'title'},
        {columnName: 'Partners', columnKey: 'partners', isArray: true},
        {columnName: 'Price', columnKey: 'asset.price'},
        {columnName: 'Restricted Countries', columnKey: 'restricted_countries', isArray: true},
        {columnName: 'Team', columnKey: 'team', isArray: true, arrayItemKey: 'name'},
        {columnName: 'Token Price', columnKey: 'finance.token_price_eth'}
    ];

    public dataTableColumns: GeneralDataTableColumn[] = _.clone(this.availableDataTableColumns);


    constructor(public icoService: IcoService) {
        super();
    }

    ngOnInit(): void {
        this.icoService.findAll().subscribe((res) => this.dataSet = res);

        this.icoSubscription = interval(this.REQUEST_INTERVAL)
            .pipe(switchMap(() => this.findIcoItem()))
            .subscribe((res) => this.dataSet = res);
    }

    ngOnDestroy(): void {
        this.icoSubscription.unsubscribe();
    }

    public loadPage(pageEvent: PageEvent | Sort): void {
        this.currentPage = pageEvent['pageIndex'] + 1 || this.currentPage;
        this.currentSorting = pageEvent['direction'] ?
            {sort: pageEvent['active'], direction: pageEvent['direction']} : null;

        this.findIcoItem().subscribe((res) => this.dataSet = res);
    }

    private findIcoItem(): Observable<Pageable<NewIco>> {
        return this.icoService.findBy(null, this.currentPage, this.currentSorting);
    }
}

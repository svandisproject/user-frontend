import {Component, OnInit, OnDestroy} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {IcoFilterService} from '../../../common/filters/IcoFilterService';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {IcoService} from '../../../common/api/services/IcoService';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';
import {Subscription} from 'rxjs/Subscription';
import {PageEvent, Sort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Token} from '../../../common/api/dataModels/Token';
import {Sorting} from '../../../common/api/util/Sorting';
import {Ico} from '../../../common/api/dataModels/Ico';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class IcoScreenerComponent extends GeneralScreenerComponent implements OnInit, OnDestroy {
    private icoSubscription: Subscription;
    private currentPage = 1;
    private currentSorting: Sorting;

    public dataSet: Pageable<Ico>;
    public dataTableColumns: GeneralDataTableColumn[] = [
        {columnName: 'remote_id', columnKey: 'remote_id'},
        {columnName: 'title', columnKey: 'title'},
        {columnName: 'advisors', columnKey: 'advisors'},
        {columnName: 'competitors', columnKey: 'competitors'},
        {columnName: 'country', columnKey: 'country'},
        {columnName: 'hard_cap', columnKey: 'hard_cap'},
        {columnName: 'industries', columnKey: 'industries', isArray: true, arrayItemKey: 'title'},
        {columnName: 'kyc', columnKey: 'kyc', isBoolean: true},
        {columnName: 'partners', columnKey: 'partners'},
        {columnName: 'raised', columnKey: 'raised'},
        {columnName: 'restricted_countries', columnKey: 'restricted_countries'},
        {columnName: 'team', columnKey: 'team'},
        {columnName: 'token_price', columnKey: 'token_price'},
    ];

    constructor(public icoService: IcoService) {
        super();
    }

    ngOnInit(): void {
        this.icoService.findAll().subscribe((res) => this.dataSet = res);
        // this.icoSubscription =
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

    private findIcoItem(): Observable<Pageable<Ico>> {
        return this.icoService.findBy(null, this.currentPage, this.currentSorting);
    }
}

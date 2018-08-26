import {Component, OnInit, OnDestroy} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {IcoService} from '../../../common/api/services/IcoService';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';
import {Subscription} from 'rxjs/Subscription';
import {PageEvent, Sort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Sorting} from '../../../common/api/util/Sorting';
import {Ico} from '../../../common/api/dataModels/Ico';
import * as _ from 'lodash';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class IcoScreenerComponent extends GeneralScreenerComponent implements OnInit, OnDestroy {
    private icoSubscription: Subscription;
    private currentPage = 1;
    private currentSorting: Sorting;

    public dataSet: Pageable<Ico>;
    public availableDataTableColumns: GeneralDataTableColumn[] = [
        {columnName: 'Remote ID', columnKey: 'remote_id'},
        {columnName: 'Title', columnKey: 'title'},
        {columnName: 'Advisors', columnKey: 'advisors'},
        {columnName: 'Competitors', columnKey: 'competitors'},
        {columnName: 'Country', columnKey: 'country'},
        {columnName: 'Hard Cap', columnKey: 'hard_cap'},
        {columnName: 'Industries', columnKey: 'industries', isArray: true, arrayItemKey: 'title'},
        {columnName: 'KYC', columnKey: 'kyc', isBoolean: true},
        {columnName: 'Partners', columnKey: 'partners'},
        {columnName: 'Raised', columnKey: 'raised'},
        {columnName: 'Restricted Countries', columnKey: 'restricted_countries'},
        {columnName: 'Team', columnKey: 'team'},
        {columnName: 'Token Price', columnKey: 'token_price'}
    ];
    public dataTableColumns: GeneralDataTableColumn[] = _.clone(this.availableDataTableColumns);


    constructor(public icoService: IcoService) {
        super();
    }

    ngOnInit(): void {
        this.icoService.findAll().subscribe((res) => this.dataSet = res);
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

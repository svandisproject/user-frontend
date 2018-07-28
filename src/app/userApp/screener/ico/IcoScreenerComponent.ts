import {Component} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {IcoFilterService} from '../../../common/filters/IcoFilterService';
import {UserDataTableColumn} from '../UserDataTableColumn';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {IcoService} from '../../../common/api/services/IcoService';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class IcoScreenerComponent extends GeneralScreenerComponent {
    public dataSet: Pageable<any>;

    public dataTableColumns: UserDataTableColumn[] = [
        {columnName: 'remote_id', columnKey: 'remote_id', isHeadColumn: true},
        {columnName: 'title', columnKey: 'title'},
        {columnName: 'advisors', columnKey: 'advisors', isList: true},
        {columnName: 'competitors', columnKey: 'competitors', isList: true},
        {columnName: 'country', columnKey: 'country'},
        {columnName: 'hard_cap', columnKey: 'hard_cap'},
        {columnName: 'industries', columnKey: 'industries', isList: true},
        {columnName: 'kyc', columnKey: 'kyc'},
        {columnName: 'partners', columnKey: 'partners', isList: true},
        {columnName: 'raised', columnKey: 'raised'},
        {columnName: 'restricted_countries', columnKey: 'restricted_countries', isList: true},
        {columnName: 'team', columnKey: 'team', isList: true},
        {columnName: 'token_price', columnKey: 'token_price'},
    ];

    constructor(public filterService: IcoFilterService, icoService: IcoService) {
        super();
        icoService.findAll()
            .subscribe((res) => this.dataSet = res);
    }
}

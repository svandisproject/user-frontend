import {Component} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {IcoFilterService} from '../../../common/filters/IcoFilterService';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {IcoService} from '../../../common/api/services/IcoService';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class IcoScreenerComponent extends GeneralScreenerComponent {
    public dataSet: Pageable<any>;

    public dataTableColumns: GeneralDataTableColumn[] = [
        {columnName: 'remote_id', columnKey: 'remote_id'},
        {columnName: 'title', columnKey: 'title'},
        {columnName: 'advisors', columnKey: 'advisors'},
        {columnName: 'competitors', columnKey: 'competitors'},
        {columnName: 'country', columnKey: 'country'},
        {columnName: 'hard_cap', columnKey: 'hard_cap'},
        {columnName: 'industries', columnKey: 'industries'},
        {columnName: 'kyc', columnKey: 'kyc'},
        {columnName: 'partners', columnKey: 'partners'},
        {columnName: 'raised', columnKey: 'raised'},
        {columnName: 'restricted_countries', columnKey: 'restricted_countries'},
        {columnName: 'team', columnKey: 'team'},
        {columnName: 'token_price', columnKey: 'token_price'},
    ];

    constructor(public filterService: IcoFilterService, icoService: IcoService) {
        super();
        icoService.findAll()
            .subscribe((res) => this.dataSet = res);
    }
}

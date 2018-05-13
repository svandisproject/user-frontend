import {Component} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {IcoFilterService} from '../../../common/filters/IcoFilterService';
import {DataTableColumn} from '../../../common/dataTable/DataTableColumn';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {IcoMockedDataSet} from './IcoMockedDataSet';

@Component({
    templateUrl: '../generalScreener.html',
    styleUrls: ['../generalScreener.scss']
})
export class IcoScreenerComponent extends GeneralScreenerComponent {
    public dataSet: Pageable<any> = IcoMockedDataSet;

    public testColumns: DataTableColumn[] = [
        {columnName: 'Ticker', columnKey: 'ticker', isHeadColumn: true},
        {columnName: 'Name', columnKey: 'name'},
        {columnName: 'Hard cap, $', columnKey: 'hardCap'},
        {columnName: 'Raised, $', columnKey: 'raised'},
        {columnName: 'Total Cap, $', columnKey: 'totalCap'},
        {columnName: 'Tokens for sale', columnKey: 'forSale'},
        {columnName: 'ICO Date', columnKey: 'icoDate'},
        {columnName: 'ICO price, $', columnKey: 'icoPrice'},
        {columnName: 'Products', columnKey: 'products'},
        {columnName: 'Industry', columnKey: 'industry'},
        {columnName: 'Country (Team)', columnKey: 'country'},
    ];


    constructor(public filterService: IcoFilterService) {
        super();
    }
}

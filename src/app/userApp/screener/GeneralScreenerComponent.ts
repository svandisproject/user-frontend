import {Component} from '@angular/core';
import {StorageAdapter} from '../../common/localStorage/StorageAdapter';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {GeneralDataTableColumn} from '../../common/dataTable/GeneralDataTableColumn';

@Component({
    selector: 'app-screener',
    templateUrl: './generalScreener.html',
    styleUrls: ['./generalScreener.scss']
})

export class GeneralScreenerComponent {
    public title = 'SCREENER.ICO.TITLE';
    public filterService: StorageAdapter<any>;
    public isFilterOpened = false;
    public dataSet: Pageable<any>;
    public dataTableColumns: GeneralDataTableColumn[];
}

import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Pageable} from '../api/dataModels/pageable/Pageable';
import {DataTableColumn} from './DataTableColumn';

@Component({
    selector: 'app-data-table',
    templateUrl: './dataTable.html',
    styleUrls: ['./dataTable.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DataTableComponent {
    @Input() dataSet: Pageable<any>;
    @Input() displayedColumns: DataTableColumn[] = [];

    public isLoading: boolean;

    public getColumnsToDisplay(): string[] {
        return this.displayedColumns.map(column => column.columnKey);
    }
}

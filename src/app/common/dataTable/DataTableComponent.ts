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

    public getColumnCss(column: DataTableColumn): string {
        if (column.isHeadColumn) {
            return 'heading-column';
        } else if (column.isNegativeHeading) {
            return 'negative-column';
        } else if (column.isPositiveHeading) {
            return 'positive-column';
        }
    }
}
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {formatDate} from '@angular/common';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Pageable} from '../api/dataModels/pageable/Pageable';
import {GeneralDataTableColumn} from './GeneralDataTableColumn';
import * as _ from 'lodash';
import {merge} from 'rxjs';
import {SortAwarePageEvent} from './SortAwarePageEvent';

@Component({
    styleUrls: ['./DataTable.scss'],
    selector: 'app-data-table',
    templateUrl: './DataTable.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DataTableComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input() dataSet: Pageable<any>;
    @Input() displayedColumns: GeneralDataTableColumn[] = [];
    @Input() settings: {
        pageIndexSubtractor: number,
        pagination: boolean,
        paginationOptions: {
            itemsPerPage: 10
        },
        filter: boolean
    };

    @Output() pageChange: EventEmitter<SortAwarePageEvent> = new EventEmitter<SortAwarePageEvent>();
    @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();

    public dataSource: MatTableDataSource<any>;

    ngOnInit(): void {
        this.initDefaultSettings();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;

        merge(this.sort.sortChange, this.paginator.page)
            .subscribe((event: SortAwarePageEvent) => {
                this.pageChange.emit(event);
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initSources();
    }

    public isNegative(value: string) {
        return Math.sign(Number(_.replace(value, /[^\d.-]/g, ''))) === -1;
    }

    public getColumnsToDisplay(): string[] {
        return this.displayedColumns.map(column => column.columnKey);
    }

    public rowSelect(row: any): void {
        this.rowSelected.emit(row);
    }

    public applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    protected initSources() {
        if (this.dataSet) {
            this.dataSource = new MatTableDataSource<any>(this.dataSet.content);
        }
    }

    public stringifyColumnValue(element, column, short = true): string {
        const columnValue = _.get(element, column.columnKey);
        let str;

        if (column.isArray) {
            // remove _.tpArray(columnValue) convetsion after ico.restricted_countries format is fixed
            str = column.arrayItemKey ?
                _.map(columnValue, item => item[column.arrayItemKey]).join(', ') : _.toArray(columnValue).join();
        } else if (column.isDate) {
            str = formatDate(columnValue, 'shortTime', 'EN');
        } else if (column.isBoolean) {
            str = columnValue ? '+' : '-';
        } else {
            str = (!_.isNumber(columnValue) && _.isEmpty(columnValue)) ? '-' : columnValue;
        }

        if (short) {
            str = _.truncate(str);
        }
        return str;
    }

    protected initDefaultSettings() {
        this.settings = _.merge({
            pageIndexSubtractor: 1,
            pagination: true,
            paginationOptions: {
                itemsPerPage: 10
            },
            filter: true
        }, this.settings);
    }
}

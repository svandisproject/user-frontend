import {
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
import {MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Pageable} from '../api/dataModels/pageable/Pageable';
import {GeneralDataTableColumn} from './GeneralDataTableColumn';
import * as _ from 'lodash';

@Component({
    styleUrls: ['./DataTable.scss'],
    selector: 'app-data-table',
    templateUrl: './DataTable.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DataTableComponent implements OnInit, OnChanges {
    @ViewChild(MatSort) sort: MatSort;

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

    @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
    @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();

    public dataSource: MatTableDataSource<any>;


    ngOnInit(): void {
        this.initDefaultSettings();
        this.initSources();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initSources();
    }

    public isNegative(value: string) {
        return Math.sign(Number(value)) === -1;
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

    public onPageChange(pageEvent: PageEvent): void {
        this.pageChange.emit(pageEvent);
    }

    private initSources() {
        if (this.dataSet) {
            this.dataSource = new MatTableDataSource<any>(this.dataSet.content);
            this.dataSource.sort = this.sort;
        }
    }

    private initDefaultSettings() {
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

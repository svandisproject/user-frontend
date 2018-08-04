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
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {Pageable} from '../api/dataModels/pageable/Pageable';
import {GeneralDataTableColumn} from './GeneralDataTableColumn';
import * as _ from 'lodash';
import {merge} from 'rxjs';

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

    @Output() pageChange: EventEmitter<PageEvent | Sort> = new EventEmitter<PageEvent | Sort>();
    @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();

    public dataSource: MatTableDataSource<any>;

    ngOnInit(): void {
        this.initDefaultSettings();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;

        merge(this.sort.sortChange, this.paginator.page)
            .subscribe((event: PageEvent | Sort) => {
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

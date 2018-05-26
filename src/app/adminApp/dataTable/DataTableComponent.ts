import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Observable} from 'rxjs/index';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {DataTableColumn} from './DataTableColumn';

@Component({
    styleUrls: ['./DataTable.scss'],
    selector: 'app-admin-table',
    templateUrl: './DataTable.html',
    encapsulation: ViewEncapsulation.None
})

export class DataTableComponent implements OnInit, OnChanges {
    @ViewChild(MatSort) sort: MatSort;

    @Input() dataSet: Observable<Pageable<any>>;
    @Input() displayedColumns: DataTableColumn[] = [];
    @Input() pageIndexSubtractor = 1;

    @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    public dataSource: MatTableDataSource<any>;
    public pageable: Pageable<any>;

    // TODO: implement loader;
    public isLoading: boolean;

    ngOnInit(): void {
        this.loadSource();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadSource();
    }

    public getColumnsToDisplay(): string[] {
        return this.displayedColumns.map(column => column.columnKey);
    }

    public onPageChange(pageEvent: PageEvent): void {
        this.pageChange.emit(pageEvent);
    }

    private loadSource() {
        this.dataSet.subscribe((data) => {
            this.pageable = data;
            this.dataSource = new MatTableDataSource<any>(this.pageable.content);
            this.dataSource.sort = this.sort;
        });
    }
}

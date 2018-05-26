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
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {DataTableColumn} from './DataTableColumn';

@Component({
    styleUrls: ['./DataTable.scss'],
    selector: 'app-admin-table',
    templateUrl: './DataTable.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataTableComponent implements OnInit, OnChanges {
    @ViewChild(MatSort) sort: MatSort;

    @Input() dataSet: Pageable<any>;
    @Input() displayedColumns: DataTableColumn[] = [];
    @Input() pageIndexSubtractor = 1;

    @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
    @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();

    public dataSource: MatTableDataSource<any>;


    ngOnInit(): void {
        this.initSources();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initSources();
    }

    public getColumnsToDisplay(): string[] {
        return this.displayedColumns.map(column => column.columnKey);
    }

    public rowSelect(row: any): void {
        this.rowSelected.emit(row);
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
}

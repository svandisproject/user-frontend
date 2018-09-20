import {Component, ViewEncapsulation} from '@angular/core';
import {StorageAdapter} from '../../common/localStorage/StorageAdapter';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {GeneralDataTableColumn} from '../../common/dataTable/GeneralDataTableColumn';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app-screener',
    templateUrl: './generalScreener.html',
    styleUrls: ['./generalScreener.scss'],
    encapsulation: ViewEncapsulation.None
})

export class GeneralScreenerComponent {
    public title = 'SCREENER.ICO.TITLE';
    public filterService: StorageAdapter<any>;
    public isFilterOpened = false;
    public dataSet: Pageable<any>;
    public dataTableColumns: GeneralDataTableColumn[];
    public availableDataTableColumns: GeneralDataTableColumn[];
    public areColumnOptionsVisible = false;
    public selectedColumnsService: StorageAdapter<any>;

    public loadPage(pageEvent: PageEvent): void {
    }

    public toggleColumnOptions(): void {
        this.areColumnOptionsVisible = !this.areColumnOptionsVisible;
    }

    public onTableColumnChange($event: GeneralDataTableColumn[]): void {
        this.dataTableColumns = $event;
    }
}

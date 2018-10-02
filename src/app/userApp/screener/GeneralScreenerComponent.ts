import {Component, ViewEncapsulation} from '@angular/core';
import {StorageAdapter} from '../../common/localStorage/StorageAdapter';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {GeneralDataTableColumn} from '../../common/dataTable/GeneralDataTableColumn';
import {PageEvent, Sort} from '@angular/material';
import {Sorting} from '../../common/api/util/Sorting';

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

    protected currentPage = 1;
    protected sortingOptions: Sorting = { sort: null, direction: null };

    public loadPage(pageEvent: PageEvent | Sort): void {
        this.currentPage = pageEvent['pageIndex'] + 1 || this.currentPage;

        if (pageEvent['active']) {
            this.sortingOptions.sort = pageEvent['active'];
            this.sortingOptions.direction = pageEvent['direction'];
        }
        // Case when we cancel sorting by field
        if (!pageEvent['pageIndex'] && (pageEvent['active'] && !pageEvent['direction'])) {
            this.sortingOptions.sort = null;
            this.sortingOptions.direction = null;
        }
    }

    public toggleColumnOptions(): void {
        this.areColumnOptionsVisible = !this.areColumnOptionsVisible;
    }

    public onTableColumnChange($event: GeneralDataTableColumn[]): void {
        this.dataTableColumns = $event;
    }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSelectionListChange} from '@angular/material';
import * as _ from 'lodash';
import {GeneralDataTableColumn} from '../../common/dataTable/GeneralDataTableColumn';

@Component({
    selector: 'app-screener-column-manager',
    templateUrl: './screenerColumnManager.html'
})

export class ScreenerColumnManagerComponent {
    @Input() tableColumns: GeneralDataTableColumn[] = [];
    @Input() selectedColumns: GeneralDataTableColumn[] = [];
    @Output() tableColumnsChange: EventEmitter<GeneralDataTableColumn[]> = new EventEmitter<GeneralDataTableColumn[]>();
    @Output() onCloseClicked: EventEmitter<any> = new EventEmitter<any>();

    public onColumnSelect($event: MatSelectionListChange): void {
        const currentlySelectedColumns = _.map($event.source.selectedOptions.selected, option => option.value);
        const updatedColumnsList = _.filter(this.tableColumns, column => _.includes(currentlySelectedColumns, column));

        this.tableColumnsChange.emit(updatedColumnsList);
    }
}
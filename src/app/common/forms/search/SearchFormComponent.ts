import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FilterItem} from '../../filters/dataModels/FilterItem';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
    selector: 'app-search-form',
    styleUrls: ['searchForm.scss'],
    templateUrl: 'searchForm.html',
    encapsulation: ViewEncapsulation.None
})
export class SearchFormComponent implements OnInit {
    @Input() placeholder = 'Search...';
    @Input() property = 'content';
    @Input() width = '';
    @Input() searchTerm: string;

    @Output() termChange: EventEmitter<FilterItem> = new EventEmitter<FilterItem>();

    public readonly separatorKeysCodes = [ENTER, COMMA];

    ngOnInit(): void {
    }

    public emitTermChange() {
        this.termChange.emit({value: this.searchTerm, property: this.property});
    }
}

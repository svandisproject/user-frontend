import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterItem} from '../../filters/dataModels/FilterItem';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
    selector: 'app-search-form, [app-search-form-inline]',
    styleUrls: ['./searchForm.scss'],
    templateUrl: './searchForm.html'
})
export class SearchFormComponent implements OnInit {
    @Input() placeholder = 'Search...';
    @Input('app-search-form-inline') inline;
    @Input() property = 'content';
    @Input() searchTerms: FilterItem[] = [];

    @Output() termsChange: EventEmitter<FilterItem[]> = new EventEmitter<FilterItem[]>();

    public readonly separatorKeysCodes = [ENTER, COMMA];

    ngOnInit(): void {
    }

    public addTerm(event: MatChipInputEvent) {
        this.searchTerms.push({value: event.value, property: this.property});
        event.input.value = '';
        this.termsChange.emit(this.searchTerms);
    }

    public removeTerm(term) {
        const index = this.searchTerms.indexOf(term);
        if (index >= 0) {
            this.searchTerms.splice(index, 1);
        }
        this.termsChange.emit(this.searchTerms);
    }
}

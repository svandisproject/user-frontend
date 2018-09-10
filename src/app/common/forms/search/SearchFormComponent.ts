import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import {FilterItem} from '../../filters/dataModels/FilterItem';

@Component({
    selector: 'app-search-form, [app-search-form-inline]',
    styleUrls: ['./searchForm.scss'],
    templateUrl: './searchForm.html'
})
export class SearchFormComponent implements OnInit {
    @Input() placeholder = 'Search...';
    @Input('app-search-form-inline') inline;
    @Input() searchTerms: FilterItem[] = [];

    @Output() termsChange: EventEmitter<FilterItem[]> = new EventEmitter<FilterItem[]>();

    public terms: { display: string, value: string }[];
    public readonly maxTags = 4;


    ngOnInit(): void {
        this.terms = _.map(this.searchTerms, item => {
            return {display: item.value, value: item.value};
        });
    }

    public emitOutput() {
        this.termsChange.emit(_.map(this.terms, (term) => {
            return {value: term.value, property: 'content'};
        }));
    }
}

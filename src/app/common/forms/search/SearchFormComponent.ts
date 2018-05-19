import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-search-form, [app-search-form-inline]',
    styleUrls: ['./searchForm.scss'],
    templateUrl: './searchForm.html'
})
export class SearchFormComponent {
    @Input() placeholder = 'Search...';
    @Input('app-search-form-inline') inline;
    @Input() searchTerms: { display: string, value: string } [] = [];

    @Output() termsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    public readonly maxTags = 4;

    public tagAdded() {
        this.termsChange.emit(_.map(this.searchTerms, term => term.value));
    }
}

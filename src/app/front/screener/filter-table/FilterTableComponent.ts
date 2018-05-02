import {Component, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import {MockedICOScreenerFilters} from './MockedICOScreenerFilters';
import {FilterType} from './FilterType';

@Component({
    selector: 'app-filter-table',
    templateUrl: './filterTable.html',
    styleUrls: ['./filterTable.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FilterTableComponent {
    public filterTypes = FilterType;
    public data = MockedICOScreenerFilters;
    public test = _.chunk(this.data, 2);
}

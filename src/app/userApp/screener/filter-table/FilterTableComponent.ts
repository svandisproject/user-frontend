import {Component, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import {MockedICOScreenerFilters} from './mocks/MockedICOScreenerFilters';
import {FilterType} from '../../../common/api/dataModels/fitlers/FilterType';
import {AdvancedFilterItem, FilterOption} from '../../../common/api/dataModels/fitlers/AdvancedFilterItem';


@Component({
    selector: 'app-filter-table',
    templateUrl: './filterTable.html',
    styleUrls: ['./filterTable.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FilterTableComponent {
    public filterTypes = FilterType;
    public columns = 2;
    public filters: AdvancedFilterItem[] = MockedICOScreenerFilters;
    public tabledFilters = _.chunk(this.filters, this.columns);

    public selectOption(option: FilterOption, options: FilterOption[]): void {
        this.resetOptionsSelected(options);
        option.selected = true;
    }

    public getButtonCssClass(option: FilterOption): string {
        const defaultClass = 'uk-button uk-button-default';
        return option.selected ? defaultClass + ' uk-active' : defaultClass;
    }

    private resetOptionsSelected(options: FilterOption[]) {
        _.forEach(options, opt => {
            opt.selected = false;
        });
    }
}


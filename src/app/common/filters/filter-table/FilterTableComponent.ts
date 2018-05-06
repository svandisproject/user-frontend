import {Component, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import {MockedICOScreenerFilters} from '../mocks/MockedICOScreenerFilters';
import {FilterType} from '../dataModels/FilterType';
import {AdvancedFilterItem, FilterOption} from '../dataModels/AdvancedFilterItem';
import {IcoFilterService} from '../IcoFilterService';


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

    constructor(private icoFilterService: IcoFilterService) {

    }

    public selectOption(option: FilterOption, options: FilterOption[]): void {
        this.resetOptionsSelected(options);
        option.selected = true;
    }

    public getButtonCssClass(option: FilterOption): string {
        const defaultClass = 'uk-button uk-button-default';
        return option.selected ? defaultClass + ' uk-active' : defaultClass;
    }

    private resetOptionsSelected(options: FilterOption[]) {
        this.icoFilterService.resetOptions(options);
    }
}


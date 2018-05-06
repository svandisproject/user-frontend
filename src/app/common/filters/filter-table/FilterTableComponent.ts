import {Component, Input, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import {FilterType} from '../dataModels/FilterType';
import {FilterOption} from '../dataModels/AdvancedFilterItem';
import {IcoFilterService} from '../IcoFilterService';


@Component({
    selector: 'app-filter-table',
    templateUrl: './filterTable.html',
    styleUrls: ['./filterTable.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FilterTableComponent {
    @Input() columns = 2;

    public filterTypes = FilterType;
    public tabledFilters = [];

    constructor(private icoFilterService: IcoFilterService) {
        this.tabledFilters = _.chunk(this.icoFilterService.get(), this.columns);
    }

    public selectOption(option: FilterOption, options: FilterOption[]): void {
        this.resetOptionsSelected(options);
        option.selected = true;
        this.saveFilters();
    }

    public selectFilter($event, filter): void {
        _.some(filter.options, (option) => {
            if (option.label === $event.target.value) {
                this.resetOptionsSelected(filter.options);
                option.selected = true;
            }
        });
        this.saveFilters();
    }

    public getButtonCssClass(option: FilterOption): string {
        const defaultClass = 'uk-button uk-button-default';
        return option.selected ? defaultClass + ' uk-active' : defaultClass;
    }

    private resetOptionsSelected(options: FilterOption[]) {
        this.icoFilterService.resetOptions(options);
    }

    private saveFilters(): void {
        this.icoFilterService.post(_.flatten(this.tabledFilters));
    }
}


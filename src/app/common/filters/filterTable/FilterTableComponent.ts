import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import {FilterType} from '../dataModels/FilterType';
import {FilterOption} from '../dataModels/AdvancedFilterItem';
import {StorageAdapter} from '../../localStorage/StorageAdapter';


@Component({
    selector: 'app-filter-table',
    templateUrl: './filterTable.html',
    styleUrls: ['./filterTable.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FilterTableComponent implements OnInit {
    @Input() columns = 2;
    @Input() filterService: StorageAdapter<any>;

    public filterTypes = FilterType;
    public tabledFilters = [];

    ngOnInit(): void {
        this.tabledFilters = _.chunk(this.filterService.get(), this.columns);
    }

    public selectOption(option: FilterOption, options: FilterOption[]): void {
        this.resetOptions(options);
        option.selected = true;
        this.saveFilters();
    }

    public selectFilter($event, filter): void {
        _.some(filter.options, (option) => {
            if (option.label === $event.target.value) {
                this.resetOptions(filter.options);
                option.selected = true;
                return true;
            }
        });
        this.saveFilters();
    }

    public getButtonCssClass(option: FilterOption): string {
        const defaultClass = 'uk-button uk-button-default';
        return option.selected ? defaultClass + ' uk-active' : defaultClass;
    }

    private resetOptions(options: FilterOption[]) {
        _.forEach(options, opt => {
            opt.selected = false;
        });
    }

    private saveFilters(): void {
        this.filterService.post(_.flatten(this.tabledFilters));
    }
}


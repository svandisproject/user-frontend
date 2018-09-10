import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';

import * as _ from 'lodash';
import {SearchFilterSettings} from '../../../common/filters/dataModels/FilterSettings';
import {SearchFilterService} from '../../../common/filters/SearchFilterService';
import {FilterItem} from '../../../common/filters/dataModels/FilterItem';


@Component({
    selector: 'app-search-filter',
    templateUrl: './searchFilter.html',
    styleUrls: ['./searchFilter.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SearchFilterComponent {
    public settings: SearchFilterSettings = <SearchFilterSettings> {};

    @Output() filterChange: EventEmitter<SearchFilterSettings> = new EventEmitter();

    constructor(private filterService: SearchFilterService) {
        this.settings = this.filterService.get();
    }

    public onTermsSearch(searchTerms: FilterItem[]) {
        this.settings.searchTerms = searchTerms;
        this.saveSettings();
        this.filterChange.emit(this.settings);
    }

    public changeDropDownFilter($event, key: 'assets' | 'region'): void {
        const filterId: string = $event.target.value;
        this.resetSelectionForFilter(key);
        this.setSelectedFilterItem(key, filterId);
        this.saveSettings();
    }

    public selectMultiFilter(filterItem: FilterItem, key: string): void {
        _.some(this.settings[key], (item) => {
            if (item.id === filterItem.id) {
                item.selected = !item.selected;
                return true;
            }
        });
        this.saveSettings();
    }

    public getButtonCss(selected: boolean): string {
        return `uk-button uk-button-default uk-float-left btn-importance ${selected ? 'btn-selected' : ''}`;
    }

    private setSelectedFilterItem(key: 'assets' | 'region', id: string): void {
        if (!this.settings[key]) {
            return;
        }

        _.some(this.settings[key], (item) => {
            if (item.id === id) {
                item.selected = !item.selected;
                return true;
            }
        });
    }

    private saveSettings(): void {
        this.filterService.post(this.settings);
        this.filterChange.emit(this.settings);
    }

    private resetSelectionForFilter(key: 'assets' | 'region') {
        _.forEach(this.settings[key], (item) => {
            item.selected = false;
        });
    }
}

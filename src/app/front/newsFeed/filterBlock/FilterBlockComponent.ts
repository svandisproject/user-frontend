import {Component, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FilterSettings} from '../../../svandisApi/dataModels/FilterSettings';
import {FilterSettingsRequest} from '../../../svandisApi/dataModels/FilterSettingsRequest';
import {FilterItem} from '../../../svandisApi/dataModels/FilterItem';
import {FilterService} from '../../../svandisApi/services/FilterService';
import * as _ from 'lodash';


@Component({
    selector: 'app-filter-block',
    templateUrl: './filterBlock.html',
    styleUrls: ['./filterBlock.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FilterBlockComponent implements OnChanges {
    public settings: FilterSettings = <FilterSettings> {};
    public settingsRequest: FilterSettingsRequest = <FilterSettingsRequest> {};

    constructor(private filterService: FilterService) {
        this.settings = this.filterService.loadSettingsFromStorage();
    }


    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    public changeDropDownFilter($event, key: 'assets' | 'region'): void {
        const filterId: string = $event.target.value;
        this.resetSelectionForFilter(key);
        this.settingsRequest[key] = this.findFilterItemFrom(key, filterId);
        this.saveSettings();
    }

    public selectMultiFilter(filterItem: FilterItem, key: string): void {
        _.some(this.settings[key], (item) => {
            if (item.id === filterItem.id) {
                item.selected = true;
                return true;
            }
        });

        this.settingsRequest[key] = this.settings[key];
        this.saveSettings();
    }

    public getButtonCss(selected: boolean): string {
        return `uk-button uk-button-default uk-float-left btn-importance ${selected ? 'btn-selected' : ''}`;
    }

    private findFilterItemFrom(key: 'assets' | 'region', id: string): FilterItem {
        if (!this.settings[key]) {
            return;
        }
        return _.find(this.settings[key], (item) => {
            if (item.id === id) {
                item.selected = true;
                return true;
            }
        });
    }

    private saveSettings(): void {
        this.filterService.saveSettings(this.settings);
    }

    private resetSelectionForFilter(key: 'assets' | 'region') {
        _.each(this.settings[key], item => item.selected = false);
    }
}

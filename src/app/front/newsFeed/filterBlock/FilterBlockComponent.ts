import {Component, ViewEncapsulation} from '@angular/core';
import {FilterSettings} from '../../../svandisApi/dataModels/FilterSettings';
import {FilterSettingsRequest} from '../../../svandisApi/dataModels/FilterSettingsRequest';
import {FilterItem} from '../../../svandisApi/dataModels/FilterItem';
import {FilterService} from '../../../svandisApi/services/FilterService';


@Component({
    selector: 'app-filter-block',
    templateUrl: './filterBlock.html',
    styleUrls: ['./filterBlock.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FilterBlockComponent {
    public settings: FilterSettings = <FilterSettings> {};
    public selectedSettings: FilterSettingsRequest = <FilterSettingsRequest> {};

    constructor(private filterService: FilterService) {
        this.settings = this.filterService.loadSettingsFromStorage();
    }

    public selectVoteFilter(vote: FilterItem): void {

    }

    public selectImportanceFilter(vote: FilterItem): void {

    }
}

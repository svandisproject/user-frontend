import {Component, ViewEncapsulation} from '@angular/core';
import {FilterSettings} from '../dataModels/FilterSettings';
import {FilterSettingsRequest} from '../dataModels/FilterSettingsRequest';

@Component({
    selector: 'app-filter-block',
    templateUrl: './filterBlock.html',
    styleUrls: ['./filterBlock.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FilterBlockComponent {
    public settings: FilterSettings = <FilterSettings> {};
    public selectedSettings: FilterSettingsRequest = <FilterSettingsRequest> {};
}

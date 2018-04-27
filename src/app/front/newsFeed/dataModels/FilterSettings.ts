import {GenericCheckbox} from './GenericCheckbox';
import {GenericOptions} from './GenericOptions';

export interface FilterSettings {
    searchQuery: string[];
    assets: GenericOptions[];
    region: GenericOptions[];
    activityFields: GenericCheckbox[];
    importanceFilters: GenericCheckbox[];
    votingFilters: GenericCheckbox[];
}
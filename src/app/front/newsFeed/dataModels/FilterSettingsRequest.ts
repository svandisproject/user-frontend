import {GenericOptions} from './GenericOptions';
import {GenericCheckbox} from './GenericCheckbox';

export interface FilterSettingsRequest {
    searchQuery: string[];
    selectedAsset: GenericOptions;
    selectedRegion: GenericOptions;
    activityFields: GenericCheckbox[];
    importanceFilters: GenericCheckbox[];
    votingFilters: GenericCheckbox[];
}

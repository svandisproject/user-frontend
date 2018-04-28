import {FilterItem} from './FilterItem';

export interface FilterSettingsRequest {
    searchQuery: string[];
    selectedAsset: FilterItem;
    selectedRegion: FilterItem;
    activityFields: FilterItem[];
    importanceFilters: FilterItem[];
    votingFilters: FilterItem[];
}

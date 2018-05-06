import {FilterItem} from './FilterItem';

export interface SearchFilterSettings {
    searchQuery: string[];
    assets: FilterItem[];
    region: FilterItem[];
    activityFields: FilterItem[];
    importanceFilters: FilterItem[];
    votingFilters: FilterItem[];
}

import {FilterItem} from './FilterItem';

export interface FilterSettings {
    searchQuery: string[];
    assets: FilterItem[];
    region: FilterItem[];
    activityFields: FilterItem[];
    importanceFilters: FilterItem[];
    votingFilters: FilterItem[];
}

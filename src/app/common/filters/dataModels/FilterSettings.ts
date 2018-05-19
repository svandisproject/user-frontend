import {FilterItem} from './FilterItem';

export interface SearchFilterSettings {
    searchTerms?: FilterItem[];
    assets: FilterItem[];
    region: FilterItem[];
    activityFields: FilterItem[];
    importanceFilters: FilterItem[];
    votingFilters: FilterItem[];
}

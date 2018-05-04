import {FilterItem} from './FilterItem';
import {FilterType} from './FilterType';
import {FilterGroup} from './FilterGroup';

export interface AdvancedFilterItem extends FilterItem {
    type: FilterType;
    group?: FilterGroup;
    options?: FilterOption[];
}

export interface FilterOption {
    value?: any;
    label?: string;
    selected?: boolean;
}

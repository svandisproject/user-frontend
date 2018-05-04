import {FilterItem} from './FilterItem';
import {FilterType} from './FilterType';

export interface AdvancedFilterItem extends FilterItem {
    type: FilterType;
    group?: FilterGroup;
    options?: FilterOption[];
}

enum FilterGroup {
    DESCRIPTIVE,
    FUNDAMENTAL,
    TECHNICAL
}

export interface FilterOption {
    value?: any;
    label?: string;
    selected?: boolean;
}

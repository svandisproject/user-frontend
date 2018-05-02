import {FilterItem} from '../../../svandisApi/dataModels/FilterItem';
import {FilterType} from './FilterType';

export interface AdvancedFilterItem extends FilterItem {
    type: FilterType;
    options?: any[];
}

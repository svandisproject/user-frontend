import {Injectable} from '@angular/core';
import {AbstractFilterService} from './AbstractFilterService';
import {FilterResource} from '../api/resource/FilterResource';
import {StorageConfig} from '../../config/StorageConfig';
import {AdvancedFilterItem} from './dataModels/AdvancedFilterItem';

@Injectable()
export class IcoFilterService extends AbstractFilterService<AdvancedFilterItem> {
    protected readonly STORAGE_KEY: string = StorageConfig.APP_PREFIX + 'icoFilters';
    protected filterId = 'ico';

    constructor(protected filterResource: FilterResource) {
        super(filterResource);
    }
}

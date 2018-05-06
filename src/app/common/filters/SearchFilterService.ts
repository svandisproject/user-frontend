import {Injectable} from '@angular/core';
import {FilterResource} from '../api/resource/FilterResource';
import {SearchFilterSettings} from './dataModels/FilterSettings';
import {StorageConfig} from '../../config/StorageConfig';
import {AbstractFilterService} from './AbstractFilterService';

@Injectable()
export class SearchFilterService extends AbstractFilterService<SearchFilterSettings> {

    protected readonly STORAGE_KEY: string = StorageConfig.APP_PREFIX + 'searchFilters';
    protected filterId = 'search';

    constructor(protected filterResource: FilterResource) {
        super(filterResource);
    }
}

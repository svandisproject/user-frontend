import {Injectable} from '@angular/core';
import {AbstractFilterService} from './AbstractFilterService';
import {FilterResource} from '../api/resource/FilterResource';
import {StorageConfig} from '../../config/StorageConfig';

@Injectable()
export class AltCoinsFilterService extends AbstractFilterService<any> {
    protected readonly STORAGE_KEY: string = StorageConfig.APP_PREFIX + 'altCoinsFilters';
    protected filterId = 'altCoin';

    constructor(protected filterResource: FilterResource) {
        super(filterResource);
    }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FilterResource} from '../api/resource/FilterResource';
import {StorageConfig} from '../../config/StorageConfig';
import {StorageAdapter} from '../localStorage/StorageAdapter';
import {AdvancedFilterItem} from './dataModels/AdvancedFilterItem';

@Injectable()
export class IcoFilterService extends StorageAdapter <AdvancedFilterItem[]> {

    constructor(private filterResource: FilterResource) {
        super(StorageConfig.APP_PREFIX + 'filterSettings');
        this.syncSettings().subscribe();
    }

    public getInitialFilters(): Observable<AdvancedFilterItem[]> {
        return this.filterResource.getAdvancedFitlers()
            .do((filters) => this.post(filters));
    }

    private syncSettings(): Observable<AdvancedFilterItem[]> {
        return this.storageChange().do((settings) => {
            this.filterResource.saveAdvancedFilters(settings).subscribe();
        });
    }
}

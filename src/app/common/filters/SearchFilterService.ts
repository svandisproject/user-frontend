import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FilterResource} from '../api/resource/FilterResource';
import {SearchFilterSettings} from './dataModels/FilterSettings';
import {StorageConfig} from '../../config/StorageConfig';
import {StorageAdapter} from '../localStorage/StorageAdapter';

@Injectable()
export class SearchFilterService extends StorageAdapter <SearchFilterSettings> {

    constructor(private filterResource: FilterResource) {
        super(StorageConfig.APP_PREFIX + 'filterSettings');
        this.syncSettings().subscribe();
    }

    public loadInitialSettings(): Observable<SearchFilterSettings> {
        return this.filterResource.getSearchFilterSettings()
            .do((settings) => this.post(settings));
    }

    private syncSettings(): Observable<SearchFilterSettings> {
        return this.storageChange().do((settings) => {
            this.filterResource.saveSearchFilterSettings(settings).subscribe();
        });
    }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FilterResource} from '../api/resource/FilterResource';
import {SearchFilterSettings} from './dataModels/FilterSettings';
import {StorageConfig} from '../../config/StorageConfig';
import {StorageAdapter} from '../localStorage/StorageAdapter';
import {SyncAwareService} from './SyncAwareService';

@Injectable()
export class SearchFilterService extends StorageAdapter <SearchFilterSettings> implements SyncAwareService {

    constructor(private filterResource: FilterResource) {
        super(StorageConfig.APP_PREFIX + 'filterSettings');
        this.sync().subscribe();
    }

    public loadInitial(): Observable<SearchFilterSettings> {
        return this.filterResource.getSearchFilterSettings()
            .do((settings) => this.post(settings));
    }

    public sync(): Observable<SearchFilterSettings> {
        return this.storageChange()
            .do((settings) => {
                this.filterResource.saveSearchFilterSettings(settings).subscribe();
            });
    }
}

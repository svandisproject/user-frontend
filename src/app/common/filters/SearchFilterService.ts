import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FilterResource} from '../api/resource/FilterResource';
import {SearchFilterSettings} from './dataModels/FilterSettings';
import * as _ from 'lodash';
import {StorageConfig} from '../../config/StorageConfig';
import {StorageAdapter} from '../localStorage/StorageAdapter';

@Injectable()
export class SearchFilterService extends StorageAdapter <SearchFilterSettings> {

    constructor(private filterResource: FilterResource) {
        super(StorageConfig.APP_PREFIX + 'filterSettings');
        this.syncSettings().subscribe();
    }

    public loadInitialSettings(): Observable<SearchFilterSettings> {
        return this.filterResource.getFilterSettings()
            .do((settings) => this.saveSettings(settings));
    }


    public loadSettingsFromStorage(): SearchFilterSettings {
        return this.get();
    }

    public saveSettings(settings: SearchFilterSettings): void {
        this.post(settings);
    }

    public isSettingsStorageEmtpy(): boolean {
        return _.isEmpty(this.get());
    }

    private syncSettings(): Observable<SearchFilterSettings> {
        return this.storageChange().do((settings) => {
            this.filterResource.saveSettings(settings).subscribe();
        });
    }
}

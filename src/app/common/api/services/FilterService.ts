import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FilterResource} from '../resource/FilterResource';
import {FilterSettings} from '../dataModels/fitlers/FilterSettings';
import * as _ from 'lodash';
import {StorageConfig} from '../../../config/StorageConfig';
import {StorageAdapter} from '../../localStorage/StorageAdapter';

@Injectable()
export class FilterService extends StorageAdapter <FilterSettings> {

    constructor(private filterResource: FilterResource) {
        super(StorageConfig.APP_PREFIX + 'filterSettings');
    }

    public loadInitialSettings(): Observable<FilterSettings> {
        return this.filterResource.getFilterSettings()
            .do((settings) => this.saveToLocalStorage(settings));
    }

    public saveSettings(settings: FilterSettings): void {
        this.saveToLocalStorage(settings);
        this.filterResource.saveSettings(settings).subscribe();
    }

    public syncSettings(): Observable<FilterSettings> {
        return this.storageChange().do((settings) => {
            this.filterResource.saveSettings(settings).subscribe();
        });
    }

    public loadSettingsFromStorage(): FilterSettings {
        return this.get();
    }

    public saveToLocalStorage(settings: FilterSettings): void {
        this.post(settings);
    }

    public isSettingsStorageEmtpy(): boolean {
        return _.isEmpty(this.get());
    }
}

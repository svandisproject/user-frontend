import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FilterResource} from '../resource/FilterResource';
import {FilterSettings} from '../dataModels/FilterSettings';
import * as _ from 'lodash';
import {StorageConfig} from '../../config/StorageConfig';

@Injectable()
export class FilterService {
    private readonly SETTINGS_STORAGE_KEY = StorageConfig.APP_PREFIX + 'filterSettings';

    constructor(private filterResource: FilterResource) {
    }

    public loadInitialSettings(): Observable<FilterSettings> {
        return this.filterResource.getFilterSettings()
            .do((settings) => this.saveToLocalStorage(settings));
    }

    public saveSettings(settings: FilterSettings): void {
        this.saveToLocalStorage(settings);
        this.filterResource.saveSettings(settings).subscribe();
    }

    public syncSettings(): Observable<any> {
        const currentSettings: FilterSettings = this.loadSettingsFromStorage();
        return this.filterResource.saveSettings(currentSettings);
    }

    public loadSettingsFromStorage(): FilterSettings {
        return JSON.parse(localStorage.getItem(this.SETTINGS_STORAGE_KEY));
    }

    public saveToLocalStorage(settings: FilterSettings): void {
        localStorage.setItem(this.SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    }

    public isSettingsStorageEmtpy(): boolean {
        return _.isEmpty(localStorage.getItem(this.SETTINGS_STORAGE_KEY));
    }
}

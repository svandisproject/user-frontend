import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FilterResource} from '../api/resource/FilterResource';
import {StorageConfig} from '../../config/StorageConfig';
import {StorageAdapter} from '../localStorage/StorageAdapter';
import {AdvancedFilterItem, FilterOption} from './dataModels/AdvancedFilterItem';
import * as _ from 'lodash';
import {SyncAwareService} from './SyncAwareService';

@Injectable()
export class IcoFilterService extends StorageAdapter <AdvancedFilterItem[]> implements SyncAwareService {

    constructor(private filterResource: FilterResource) {
        super(StorageConfig.APP_PREFIX + 'icoFilters');
        this.sync().subscribe();
    }

    public loadInitial(): Observable<AdvancedFilterItem[]> {
        return this.filterResource.getAdvancedFitlers()
            .do((filters) => this.post(filters));
    }

    public sync(): Observable<AdvancedFilterItem[]> {
        return this.storageChange().do((settings) => {
            this.filterResource.saveAdvancedFilters(settings).subscribe();
        });
    }

    public resetOptions(options: FilterOption[]) {
        _.forEach(options, opt => {
            opt.selected = false;
        });
    }
}

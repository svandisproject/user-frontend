import {Observable} from 'rxjs/Observable';
import {FilterResource} from '../api/resource/FilterResource';
import {StorageAdapter} from '../localStorage/StorageAdapter';
import {SyncAwareService} from './SyncAwareService';

export abstract class AbstractFilterService<T> extends StorageAdapter<T> implements SyncAwareService {
    protected abstract readonly STORAGE_KEY: string;
    protected abstract filterId: string;

    constructor(protected filterResource: FilterResource) {
        super();
        this.sync().subscribe();
    }

    public loadInitial(): Observable<T> {
        return this.filterResource.getFilter<T>(this.filterId)
            .do((filters) => this.post(filters));
    }

    public sync(): Observable<T> {
        return this.storageChange().do((settings) => {
            this.filterResource.saveFilters(settings).subscribe();
        });
    }
}

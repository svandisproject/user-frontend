import {FilterService} from '../../svandisApi/services/FilterService';
import {Observable} from 'rxjs/Observable';

export class FilterSettingsInitFactory {

    public static factory(filterService: FilterService): () => Promise<any> {
        return () => FilterSettingsInitFactory.initFilterSettings(filterService).toPromise();
    }

    private static initFilterSettings(filterService: FilterService): Observable<any> {
        if (filterService.isSettingsStorageEmtpy()) {
            return filterService.loadInitialSettings();
        } else {
            return Observable.of(null);
        }
    }
}

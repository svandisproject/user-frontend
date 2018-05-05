import {Observable} from 'rxjs/Observable';
import {FilterService} from '../../common/api/services/FilterService';

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

import {Observable} from 'rxjs/Observable';
import {SearchFilterService} from '../../common/filters/SearchFilterService';

export class FilterSettingsInitFactory {

    public static factory(filterService: SearchFilterService): () => Promise<any> {
        return () => FilterSettingsInitFactory.initFilterSettings(filterService).toPromise();
    }

    private static initFilterSettings(filterService: SearchFilterService): Observable<any> {
        if (filterService.isSettingsStorageEmtpy()) {
            return filterService.loadInitialSettings();
        } else {
            return Observable.of(null);
        }
    }
}

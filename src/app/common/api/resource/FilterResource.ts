import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {SearchFilterSettings} from '../../filters/dataModels/FilterSettings';
import {mockedSettings} from '../../filters/mocks/mockedFilterSettings';
import {AdvancedFilterItem} from '../../filters/dataModels/AdvancedFilterItem';
import {MockedICOScreenerFilters} from '../../filters/mocks/MockedICOScreenerFilters';

@Injectable()
export class FilterResource {

    public getSearchFilterSettings(): Observable<SearchFilterSettings> {
        return Observable.of(mockedSettings);
    }

    public saveSearchFilterSettings(fitleSettings: SearchFilterSettings): Observable<any> {
        console.log('settings save to DB');
        return Observable.of(null);
    }

    public getAdvancedFitlers(): Observable<AdvancedFilterItem[]> {
        return Observable.of(MockedICOScreenerFilters);
    }

    public saveAdvancedFilters(filters: AdvancedFilterItem[]): Observable<any> {
        console.log('Advanced filters saved to DB');
        return Observable.of(null);
    }
}

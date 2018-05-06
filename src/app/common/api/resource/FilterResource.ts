import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {SearchFilterSettings} from '../../filters/dataModels/FilterSettings';
import {mockedSettings} from '../../filters/mocks/mockedFilterSettings';

@Injectable()
export class FilterResource {

    public getFilterSettings(): Observable<SearchFilterSettings> {
        return Observable.of(mockedSettings);
    }

    public saveSettings(fitleSettings: SearchFilterSettings): Observable<any> {
        console.log('settings save to DB');
        return Observable.of(null);
    }
}

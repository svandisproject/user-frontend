import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FilterSettings} from '../dataModels/fitlers/FilterSettings';
import {mockedSettings} from './mocks/mockedFilterSettings';

@Injectable()
export class FilterResource {

    public getFilterSettings(): Observable<FilterSettings> {
        return Observable.of(mockedSettings);
    }

    public saveSettings(fitleSettings: FilterSettings): Observable<any> {
        return Observable.of(null);
    }
}

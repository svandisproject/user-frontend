import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {MockedFilters} from '../../filters/mocks/mockedFilters';

@Injectable()
export class FilterResource {

    public getFilter<T>(id: string): Observable<any> {
        return Observable.of(MockedFilters[id]);
    }

    public saveFilters<T>(filters: any): Observable<any> {
        console.log('Advanced filters saved to DB');
        return Observable.of(null);
    }
}

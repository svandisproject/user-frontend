import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {HttpService} from '../../http/HttpService';
import {Filter} from '../dataModels/Filter';

export class AbstractCrudResource<T> {

    constructor(protected URL: string,
                protected httpService: HttpService) {
    }

    public findAll(noParams = false): Observable<Pageable<T>> {
        if (noParams) {
            return this.httpService.get(this.URL);
        }

        return this.httpService.get(this.URL, {
            params: {
                direction: 'desc'
            }
        });
    }

    public findById(id: string): Observable<T> {
        return this.httpService.get(this.URL + '/' + id);
    }

    public create(payload: { [key: string]: T }): Observable<T> {
        return this.httpService.post(this.URL, payload);
    }

    public update(id: string, payload: { [key: string]: T }): Observable<T> {
        return this.httpService.put(this.URL + '/' + id, payload);
    }

    public findBy(filters: Filter[], page: string = '1', noDirection = false): Observable<Pageable<T>> {
        const encodedFilters: string = btoa(JSON.stringify(filters));
        const params = {
            filter: encodedFilters,
            page: page
        };

        if (!noDirection) {
            params['direction'] = 'desc';
        }

        return this.httpService.get(this.URL + '/filter', {
            params: params
        });
    }
}
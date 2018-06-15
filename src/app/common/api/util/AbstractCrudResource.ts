import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {HttpService} from '../../http/HttpService';
import {Filter} from '../dataModels/Filter';

export class AbstractCrudResource<T> {

    constructor(protected URL: string,
                protected httpService: HttpService) {
    }

    public findAll(): Observable<Pageable<T>> {
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

    public findBy(filters: Filter[], page: string = '1'): Observable<Pageable<T>> {
        const encodedFilters: string = btoa(JSON.stringify(filters));

        return this.httpService.get(this.URL + '/filter', {
            params: {
                filter: encodedFilters,
                direction: 'desc',
                page: page
            }
        });
    }
}
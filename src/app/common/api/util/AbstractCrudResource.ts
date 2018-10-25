import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {HttpService} from '../../http/HttpService';
import {Filter} from '../dataModels/Filter';
import {Sorting} from './Sorting';
import * as _ from 'lodash';

export class AbstractCrudResource<T> {

    constructor(protected URL: string,
                protected httpService: HttpService) {
    }

    public findAll(noParams = false, params?: any): Observable<Pageable<T>> {
        params = params || {
            direction: 'desc'
        };

        if (noParams) {
            return this.httpService.get(this.URL);
        }

        return this.httpService.get(this.URL, {
            params: params
        });
    }

    public findById(id: string): Observable<T> {
        return this.httpService.get(this.URL + '/' + id);
    }

    public create(payload: { [key: string]: T } | T): Observable<T> {
        return this.httpService.post(this.URL, payload);
    }

    public update(id: string | number, payload: { [key: string]: T } | T): Observable<T> {
        return this.httpService.put(this.URL + '/' + id, payload);
    }

    public delete(id: string | number): Observable<void> {
        return this.httpService.delete(this.URL + '/' + id);
    }

    public findBy(filters: Filter[], page: string = '1', sort?: Sorting, perPage?: number): Observable<Pageable<T>> {
        const encodedFilters: string = btoa(JSON.stringify(filters));
        const params = {
            filter: encodedFilters,
            page: page
        };

        if (!_.get(sort, 'sort')) {
            params['direction'] = 'desc';
        } else {
            params['sort'] = sort.sort;
            if (perPage) {
                params['per_page'] = perPage;
            }
            params['direction'] = sort.direction || 'desc';
        }

        return this.httpService.get(this.URL + '/filter', {
            params: params
        });
    }
}
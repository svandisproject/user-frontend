import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {HttpService} from '../../http/HttpService';

export class AbstractCrudResource<T> {

    constructor(protected URL: string,
                protected httpService: HttpService) {
    }

    public findAll(): Observable<Pageable<T>> {
        return this.httpService.get(this.URL);
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
}
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from '../dataModels/Post';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';

@Injectable()
export class PostResource {
    private readonly URL: string = SvandisApi.API_URL + '/post';

    constructor(private httpService: HttpService) {
    }

    public findAll(): Observable<Pageable<Post>> {
        return this.httpService.get(this.URL);
    }

    public findBy(filters: Filter[]): Observable<Pageable<Post>> {
        const encodedFilters: string = btoa(JSON.stringify(filters));

        return this.httpService.get(this.URL + '/filter', {
            params: {
                filter: encodedFilters
            }
        });
    }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from '../dataModels/Post';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {AbstractCrudResource} from '../util/AbstractCrudResource';

@Injectable()
export class PostResource extends AbstractCrudResource<Post> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/post', httpService);
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

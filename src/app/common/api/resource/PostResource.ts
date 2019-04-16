import {Injectable} from '@angular/core';
import {Post} from '../dataModels/Post';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {AbstractCrudResource} from '../util/AbstractCrudResource';
import {Observable} from 'rxjs';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {Sorting} from '../util/Sorting';
import * as _ from 'lodash';

@Injectable()
export class PostResource extends AbstractCrudResource<Post> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/post', httpService);
    }

    public findMostLiked(period: string): Observable<Pageable<Post>> {
        return this.httpService.get(this.URL + '/most-liked/' + period);
    }

    public findBy(filters: Filter[], page: string = '1', sort?: Sorting, perPage?: number): Observable<Pageable<Post>> {
        const encodedFilters: string = btoa(JSON.stringify(filters));
        const params = {
            filter: encodedFilters,
            page: page
        };

        if (!_.get(sort, 'sort')) {
            params['direction'] = 'desc';
        } else {
            params['sort'] = sort.sort;
            params['direction'] = sort.direction || 'desc';
        }

        if (perPage) {
            params['per_page'] = perPage;
        }

        return this.httpService.get(SvandisApi.ALT_API_URL + '/post' + '/filter', {
            params: params
        });
    }
}

import {Injectable} from '@angular/core';
import {Post} from '../dataModels/Post';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {AbstractCrudResource} from '../util/AbstractCrudResource';
import {Observable} from 'rxjs';
import {Pageable} from '../dataModels/pageable/Pageable';

@Injectable()
export class PostResource extends AbstractCrudResource<Post> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/post', httpService);
    }

    public findMostLiked(period: 'day' | 'week' | 'month' ): Observable<Pageable<Post>> {
        return this.httpService.get(this.URL + '/most-liked/' + period);
    }
}

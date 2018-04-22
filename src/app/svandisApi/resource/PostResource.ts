import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from '../dataModels/Post';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../common/http/HttpService';

@Injectable()
export class PostResource {
    private readonly URL: string = SvandisApi.API_URL + '/post';

    constructor(private httpService: HttpService) {
    }

    public findAll(): Observable<Post[]> {
        return this.httpService.get(this.URL);
    }
}

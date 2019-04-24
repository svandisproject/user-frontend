import {Injectable} from '@angular/core';
import {HttpService} from '../../common/http/HttpService';
import {SvandisNewsApiConfig} from '../config/SvandisNewsApiConfig';
import {Observable} from 'rxjs/Observable';
import {SaveTagsRes} from '../dataModels/SaveTagsRes';
import {UserTagsRes} from '../dataModels/UserTagsRes';
import { map } from 'rxjs/operators';

@Injectable()
export class DashboardResource {
    private readonly URL = SvandisNewsApiConfig.API_HOST + '/dashboard/application';

    constructor (private httpService: HttpService) {
    }

    public getUserTags(): Observable<UserTagsRes> {
        return this.httpService.get(this.URL)
            .pipe(map((res) => res.data));
    }

    public saveUserTags(tags: string[]): Observable<SaveTagsRes> {
        return this.httpService.put(this.URL, {tags})
            .pipe(map((res) => res.data));
    }

}
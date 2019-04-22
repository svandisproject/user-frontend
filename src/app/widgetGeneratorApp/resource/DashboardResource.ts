import {Injectable} from '@angular/core';
import {HttpService} from '../../common/http/HttpService';
import {SvandisNewsApiConfig} from '../config/SvandisNewsApiConfig';
import {Observable} from 'rxjs/Observable';
import {SaveTagsRes} from '../dataModels/SaveTagsRes';
import {UserTagsRes} from '../dataModels/UserTagsRes';

@Injectable()
export class DashboardResource {
    private URL = SvandisNewsApiConfig.API_HOST + '/dashboard/application';

    constructor(private httpService: HttpService) {
    }

    getUserTags(): Observable<UserTagsRes> {
        return this.httpService.get(this.URL);
    }

    saveUserTags(tags: string[]): Observable<SaveTagsRes> {
        return this.httpService.put(this.URL, {tags});
    }

}
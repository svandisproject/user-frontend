import {Injectable} from '@angular/core';
import {HttpService} from '../../common/http/HttpService';
import {SvandisNewsApiConfig} from '../config/SvandisNewsApiConfig';
import {Observable} from 'rxjs/Observable';
import {GetTagsRes} from '../dataModels/GetTagsRes';

@Injectable()
export class TagsResource {
    private URL = SvandisNewsApiConfig.API_HOST + '/dashboard/tags';
    constructor(private httpService: HttpService) {}

    findAll(): Observable<GetTagsRes> {
        return this.httpService.get(this.URL);
    }
}

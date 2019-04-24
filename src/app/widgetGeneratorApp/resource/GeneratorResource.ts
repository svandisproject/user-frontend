import {Injectable} from '@angular/core';
import {HttpService} from '../../common/http/HttpService';
import {SvandisNewsApiConfig} from '../config/SvandisNewsApiConfig';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {TagGroup} from '../dataModels/TagGroup';
@Injectable()
export class TagsResource {
    private readonly URL = SvandisNewsApiConfig.API_HOST + '/dashboard/tags';
    constructor (private httpService: HttpService) {
    }

    public findAll(): Observable<TagGroup[]> {
        return this.httpService.get(this.URL)
            .pipe(map((res) => res.data));
    }
}

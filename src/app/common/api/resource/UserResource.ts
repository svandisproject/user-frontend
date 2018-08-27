import {Injectable} from '@angular/core';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';

@Injectable()
export class UserResource {
    private readonly URL = SvandisApi.API_URL + '/user';

    constructor(private httpService: HttpService) {
    }

    public findCrawled() {
        return this.httpService.get(this.URL + '/me/crawled');
    }
}
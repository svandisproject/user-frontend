import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import {AbstractCrudResource} from '../util/AbstractCrudResource';
import {WebFeed} from '../dataModels/WebFeed';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';

@Injectable()
export class WebFeedResource extends AbstractCrudResource<WebFeed> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/web-feed', httpService);
    }
}

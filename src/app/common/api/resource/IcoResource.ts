import {Injectable} from '@angular/core';
import {Post} from '../dataModels/Post';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {AbstractCrudResource} from '../util/AbstractCrudResource';

@Injectable()
export class IcoResource extends AbstractCrudResource<Post> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/ico', httpService);
    }
}

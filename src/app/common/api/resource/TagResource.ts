import {Injectable} from '@angular/core';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {Tag} from '../dataModels/Tag';
import {AbstractCrudResource} from '../util/AbstractCrudResource';

@Injectable()
export class TagResource extends AbstractCrudResource<Tag> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/tag', httpService);
    }
}

import {Injectable} from '@angular/core';
import {SvandisApi} from '../../common/api/config/SvandisApi';
import {HttpService} from '../../common/http/HttpService';
import {AbstractCrudResource} from '../../common/api/util/AbstractCrudResource';
import {Tag} from '../dataModels/Tag';

/*
@Injectable()
export class TagsResource extends AbstractCrudResource<Tag> {
    constructor(httpService: HttpService) {
        /!*super(SvandisApi.API_URL + '/tags', httpService);*!/
    }

}
*/

@Injectable()
export class TagsResource {
    constructor(httpService: HttpService) {
    }

}

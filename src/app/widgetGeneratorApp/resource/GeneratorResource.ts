import {Injectable} from '@angular/core';
import {HttpService} from '../../common/http/HttpService';
import {AbstractCrudResource} from '../../common/api/util/AbstractCrudResource';
import {Tag} from '../dataModels/Tag';
import {SvandisNewsApiConfig} from '../config/SvandisNewsApiConfig';

@Injectable()
export class TagsResource extends AbstractCrudResource<Tag> {
    constructor(httpService: HttpService) {
        super(SvandisNewsApiConfig.API_HOST + '/dashboard/tags', httpService);
    }

}

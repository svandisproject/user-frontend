import {Injectable} from '@angular/core';
import {HttpService} from '../../http/HttpService';
import {AbstractCrudResource} from '../util/AbstractCrudResource';
import {SvandisApiV2} from '../config/SvandisApiV2';
import {Filter} from '../dataModels/Filter';
import {TagGroup} from '../dataModels/TagGroup';

@Injectable()
export class SvandisTagGroupResource extends AbstractCrudResource<TagGroup> {
    constructor(httpService: HttpService) {
        super(SvandisApiV2.API_URL + '/tag-group', httpService);
    }

    public findBy(filters: Filter[]) {
        return this.httpService.get(this.URL, {
            params: {
                filter: btoa(JSON.stringify(filters))
            }
        });
    }
}

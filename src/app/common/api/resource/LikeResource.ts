import {Injectable} from '@angular/core';
import {Like} from '../dataModels/Like';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {AbstractCrudResource} from '../util/AbstractCrudResource';
import {Filter} from '../dataModels/Filter';

@Injectable()
export class LikeResource extends AbstractCrudResource<Like> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/like', httpService);
    }

    public findByUser(user) {
        const filterQuery = [new Filter('eq', 'user.id', user.id)];

        return this.findBy(filterQuery);
    }
}
import {Injectable} from '@angular/core';
import {Ico} from '../dataModels/Ico';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {AbstractCrudResource} from '../util/AbstractCrudResource';

@Injectable()
export class IcoResource extends AbstractCrudResource<Ico> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/ico', httpService);
    }
}

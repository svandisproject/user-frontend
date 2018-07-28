import {SvandisApi} from '../config/SvandisApi';
import {AbstractCrudResource} from '../util/AbstractCrudResource';
import {Injectable} from '@angular/core';
import {HttpService} from '../../http/HttpService';
import {Token} from '../dataModels/Token';

@Injectable()
export class TokenResource extends AbstractCrudResource<Token> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/token', httpService);
    }
}

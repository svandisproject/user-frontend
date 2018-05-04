import {Injectable} from '@angular/core';
import {HttpService} from '../http/HttpService';
import {TokenRequest} from './dataModels/TokenRequest';
import {Observable} from 'rxjs/Observable';
import {AuthToken} from './dataModels/AuthToken';
import {RefreshTokenRequest} from './dataModels/RefreshRequest';
import {SvandisApi} from '../../svandisApi/config/SvandisApi';

@Injectable()
export class AuthResource {
    private static readonly ENDPOINT: string = SvandisApi.API_URL + '/login_check';

    constructor(private httpService: HttpService) {
    }

    public requestAuthToken(tokenRequest: TokenRequest): Observable<AuthToken> {
        return this.httpService.post(AuthResource.ENDPOINT, tokenRequest);
    }

    public refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<AuthToken> {
        return this.httpService.post(AuthResource.ENDPOINT, refreshTokenRequest);
    }
}

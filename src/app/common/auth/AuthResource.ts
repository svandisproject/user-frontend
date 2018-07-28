import {Injectable} from '@angular/core';
import {HttpService} from '../http/HttpService';
import {TokenRequest} from './dataModels/TokenRequest';
import {Observable} from 'rxjs/Observable';
import {AuthResponse} from './dataModels/AuthToken';
import {RefreshTokenRequest} from './dataModels/RefreshRequest';
import {SvandisApi} from '../api/config/SvandisApi';

@Injectable()
export class AuthResource {
    private static readonly ENDPOINT: string = SvandisApi.API_URL + '/login_check';

    constructor(private httpService: HttpService) {
    }

    public requestAuthToken(tokenRequest: TokenRequest): Observable<AuthResponse> {
        return this.httpService.post(AuthResource.ENDPOINT, tokenRequest);
    }

    public refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<AuthResponse> {
        return this.httpService.post(AuthResource.ENDPOINT, refreshTokenRequest);
    }
}

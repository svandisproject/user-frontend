import {Injectable} from '@angular/core';
import {AuthToken} from './AuthToken';
import {AuthResource} from './AuthResource';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RefreshTokenRequest} from './RefreshRequest';
import {TokenRequest} from './TokenRequest';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {
    public static readonly AUTH_TOKEN_KEY: string = 'authToken';
    public static readonly REFRESH_TOKEN_KEY: string = 'refreshToken';

    private authToken: AuthToken = <AuthToken>{};

    constructor(private authResource: AuthResource) {
    }

    public requestToken(payload: TokenRequest): Observable<AuthToken> {
        return this.authResource.requestAuthToken(payload)
            .do((token) => this.authToken = token);
    }

    public getCurrentAuthToken(): string {
        return this.authToken.token;
    }

    public getAuthHeader(): HttpHeaders {
        const headers: HttpHeaders = new HttpHeaders();
        headers.set('Authorization', 'Bearer ' + this.getCurrentAuthToken());
        return headers;
    }

    public getAuthTokenString(): string {
        return 'Bearer ' + this.getCurrentAuthToken();
    }

    public isTokenExpired(): void {
    }

    public refreshToken(): Observable<AuthToken> {
        return this.authResource.refreshToken(this.buildRefreshTokenRequest())
            .do((authToken) => this.authToken = authToken);
    }

    private buildRefreshTokenRequest(): RefreshTokenRequest {
        return {
            grant_type: 'refresh_token',
            refresh_token: this.authToken.token
        };
    }
}

import {Injectable} from '@angular/core';
import {AuthToken} from './dataModels/AuthToken';
import {AuthResource} from './AuthResource';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RefreshTokenRequest} from './dataModels/RefreshRequest';
import {TokenRequest} from './dataModels/TokenRequest';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    public static readonly AUTH_TOKEN_KEY: string = 'authToken';
    public static readonly REFRESH_TOKEN_KEY: string = 'refreshToken';
    public static readonly SESSION_STORAGE_KEY: string = 'accessToken';

    private authToken: AuthToken = <AuthToken>{};

    constructor(private authResource: AuthResource) {
    }

    public requestToken(payload: TokenRequest): Observable<AuthToken> {
        return this.authResource.requestAuthToken(payload)
            .do((token) => this.authToken = token);
    }

    public getCurrentAuthToken(): string {
        return this.authToken.token || this.getSessionToken();
    }

    // TODO: complex check might be added
    public isAuthenticated(): boolean {
        return !_.isEmpty(this.getSessionToken());
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

    public getSessionToken(): string {
        const token: string = sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY);
        return token;
    }

    public setSessionToken(token: string): void {
        sessionStorage.setItem(AuthService.SESSION_STORAGE_KEY, token);
    }

    public removeToken(): void {
        sessionStorage.removeItem(AuthService.SESSION_STORAGE_KEY);
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

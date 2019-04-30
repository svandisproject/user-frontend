import {Injectable} from '@angular/core';
import {AuthResponse} from './dataModels/AuthToken';
import {AuthResource} from './AuthResource';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RefreshTokenRequest} from './dataModels/RefreshRequest';
import {TokenRequest} from './dataModels/TokenRequest';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';
import {JwtTokenDecoded} from './dataModels/JwtTokenDecoded';
import * as JwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
    public static readonly AUTH_TOKEN_KEY: string = 'authToken';
    public static readonly REFRESH_TOKEN_KEY: string = 'refreshToken';
    public static readonly SESSION_STORAGE_KEY: string = 'accessToken';

    private authToken: AuthResponse = <AuthResponse>{};

    constructor(private authResource: AuthResource) {
    }

    public requestToken(payload: TokenRequest): Observable<AuthResponse> {
        return this.authResource.requestAuthToken(payload)
            .do((token) => this.authToken = token);
    }

    public getCurrentJwtToken(): string {
        return this.authToken.token || this.getSessionJwtToken();
    }

    public getDecodedToken(): JwtTokenDecoded {
        return JwtDecode(this.getCurrentJwtToken());
    }

    public isAuthenticated(): boolean {
        return !_.isEmpty(this.getSessionJwtToken());
    }

    public getAuthHeader(): HttpHeaders {
        const headers: HttpHeaders = new HttpHeaders();
        headers.set('Authorization', 'Bearer ' + this.getCurrentJwtToken());
        return headers;
    }

    public getJwtToken(): string {
        return 'Bearer ' + this.getCurrentJwtToken();
    }

    public isTokenExpired(): boolean {
        return this.getDecodedToken().exp < Date.now() / 1000;
    }

    public getSessionJwtToken(): string {
        return localStorage.getItem(AuthService.SESSION_STORAGE_KEY);
    }

    public setSessionToken(token: string): void {
        localStorage.setItem(AuthService.SESSION_STORAGE_KEY, token);
    }

    public removeToken(): void {
        localStorage.removeItem(AuthService.SESSION_STORAGE_KEY);
    }

    public refreshToken(): Observable<AuthResponse> {
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

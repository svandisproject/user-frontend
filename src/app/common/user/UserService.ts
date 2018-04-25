import {Injectable} from '@angular/core';
import {AuthNoTokenException} from '../auth/AuthNoTokenException';
import * as _ from 'lodash';
import {AuthService} from '../auth/AuthService';
import {TokenRequest} from '../auth/TokenRequest';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
    public static readonly SESSION_STORAGE_KEY: string = 'accessToken';
    private user: any;

    constructor(private authService: AuthService) {
    }

    public setUser(user: any): void {
        this.user = user;
    }

    public getCurrentUser(): any {
        return this.user;
    }

    public getSessionToken(): string {
        const token: string = sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new AuthNoTokenException();
        }
        return sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    }

    public setSessionToken(token: string): void {
        sessionStorage.setItem(UserService.SESSION_STORAGE_KEY, token);
    }

    public signIn(tokenRequest: TokenRequest): Observable<any> {
        return this.authService.requestToken(tokenRequest)
            .map((token) => {
                this.setUser({});
                this.setSessionToken(token.token);
            });
    }

    public signOut(): void {
        // TODO: if user is saved on backend , logout
        this.setSessionToken(null);
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(sessionStorage.getItem(UserService.SESSION_STORAGE_KEY));
    }
}

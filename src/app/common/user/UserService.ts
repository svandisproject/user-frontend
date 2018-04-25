import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {AuthService} from '../auth/AuthService';
import {TokenRequest} from '../auth/TokenRequest';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
    private user: any;

    constructor(private authService: AuthService) {
    }

    public setUser(user: any): void {
        this.user = user;
    }

    public getCurrentUser(): any {
        return this.user;
    }

    public signIn(tokenRequest: TokenRequest): Observable<any> {
        return this.authService.requestToken(tokenRequest)
            .map((token) => {
                this.setUser({});
                this.authService.setSessionToken(token.token);
            });
    }

    public signOut(): void {
        // TODO: if user is saved on backend , logout
        this.authService.setSessionToken(null);
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY));
    }
}
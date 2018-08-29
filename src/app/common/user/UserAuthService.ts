import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {AuthService} from '../auth/AuthService';
import {TokenRequest} from '../auth/dataModels/TokenRequest';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserRoles} from './UserRoles';


@Injectable()
export class UserAuthService {
    private user: any;

    constructor(private authService: AuthService) {
    }

    public setUser(user: any): void {
        this.user = user;
    }

    public getCurrentUser(): any {
        return this.user;
    }

    public signIn(tokenRequest: TokenRequest): Observable<void> {
        return this.authService.requestToken(tokenRequest)
            .map((token) => {
                this.setUser({});
                this.authService.setSessionToken(token.token);
            });
    }

    public signOut(): void {
        this.authService.removeToken();
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY));
    }

    public hasRoleAdmin(): boolean {
        return _.includes(this.authService.getDecodedToken().roles, UserRoles.ADMIN);
    }
}
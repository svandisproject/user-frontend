import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {AuthService} from '../auth/AuthService';
import {TokenRequest} from '../auth/dataModels/TokenRequest';
import {Observable} from 'rxjs/Observable';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {UserRoles} from './UserRoles';
import {User} from '../api/dataModels/User';
import {UserResource} from '../api/resource/UserResource';
import {LikeResource} from '../api/resource/LikeResource';


@Injectable()
export class UserAuthService {
    private user: User;

    constructor(private authService: AuthService,
                private userResource: UserResource,
                private likeResource: LikeResource) {
    }

    public setUser(user: any): void {
        this.user = user;
    }

    public getCurrentUser(): Observable<User> {
        if (!this.user) {
            return this.userResource.getCurrentUserInfo()
                .pipe(
                    switchMap(user => {
                        this.user = user;
                        return this.likeResource.findByUser(user);
                    }),
                    map(currentUserLikes => {
                        this.user.likedArticles = _.map(currentUserLikes.content, like => like.post.id);
                        return this.user;
                    })
                );
        } else {
            return of(this.user);
        }
    }

    public signIn(tokenRequest: TokenRequest): Observable<void> {
        return this.authService.requestToken(tokenRequest)
            .map((token) => {
                this.authService.setSessionToken(token.token);
            });
    }

    public signOut(): void {
        this.authService.removeToken();
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(localStorage.getItem(AuthService.SESSION_STORAGE_KEY));
    }

    public hasRoleAdmin(): boolean {
        return _.includes(this.authService.getDecodedToken().roles, UserRoles.ADMIN);
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserAuthService} from '../user/UserAuthService';
import * as _ from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private userService: UserAuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.userService.isUserSignedIn()) {
            this.router.navigate(['login']);
            return false;
        }

        if (_.includes(state.url, 'admin') && !this.userService.hasRoleAdmin()) {
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }
}

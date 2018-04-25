import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../common/user/UserService';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

    constructor(private router: Router,
                private userService: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.userService.isUserSignedIn()) {
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }
}

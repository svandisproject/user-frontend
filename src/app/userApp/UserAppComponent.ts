import {Component} from '@angular/core';
import {AuthService} from '../common/auth/AuthService';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-app',
    templateUrl: './userApp.html',
    styleUrls: ['userApp.scss']
})

export class UserAppComponent {
    constructor(private authService: AuthService, private router: Router) {
    }


    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    public logout(): void {
        this.authService.removeToken();
        this.router.navigate(['login']);
    }
}
import {Component} from '@angular/core';
import {AuthService} from '../common/auth/AuthService';

@Component({
    selector: 'app-user-app',
    templateUrl: './userApp.html',
})

export class UserAppComponent {
    constructor(private authService: AuthService) {
    }

    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }
}
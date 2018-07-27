import {Component} from '@angular/core';
import {AuthService} from '../common/auth/AuthService';

@Component({
    selector: 'app-user-app',
    templateUrl: './userApp.html',
    styleUrls: ['userApp.scss']
})

export class UserAppComponent {
    constructor(private authService: AuthService) {
    }


    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }
}
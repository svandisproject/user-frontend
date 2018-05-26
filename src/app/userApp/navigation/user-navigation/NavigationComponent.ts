import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationItem} from '../NavigationItem';
import {FrontNavigation} from '../../config/FrontNavigation';
import {UserService} from '../../../common/user/UserService';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.html',
    styleUrls: ['./navigation.scss'],
    encapsulation: ViewEncapsulation.None
})

export class NavigationComponent {
    public navItems: NavigationItem[] = FrontNavigation;

    constructor(private userService: UserService,
                private router: Router) {

    }

    public logout(): void {
        this.userService.signOut();
        this.router.navigate(['login']);
    }

    public isLoggedIn(): boolean {
        return this.userService.isUserSignedIn();
    }
}

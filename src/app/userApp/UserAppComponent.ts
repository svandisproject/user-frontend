import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../common/auth/AuthService';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {EthConnectionPromptComponent} from './web3/ethConnectionPromptComponent';
import {UserAuthService} from '../common/user/UserAuthService';

@Component({
    selector: 'app-user-app',
    templateUrl: './userApp.html',
    styleUrls: ['userApp.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UserAppComponent {
    public isMobile = false;
    public sidebarOpen = false;

    constructor(private authService: AuthService,
                private router: Router,
                private userService: UserAuthService,
                private breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Handset])
            .subscribe((result) => this.isMobile = result.matches);
    }

    openSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    }

    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    public isAdmin(): boolean {
        return this.userService.hasRoleAdmin();
    }

    public logout(): void {
        this.authService.removeToken();
        this.router.navigate(['login']);
    }
}
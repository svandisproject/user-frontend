import {Component} from '@angular/core';
import {AuthService} from '../common/auth/AuthService';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
    selector: 'app-user-app',
    templateUrl: './userApp.html',
    styleUrls: ['userApp.scss']
})

export class UserAppComponent {
    public isMobile = false;
    public sidebarOpen = false;

    constructor(private authService: AuthService,
                private router: Router,
                private breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Handset])
            .subscribe((result) => this.isMobile = result.matches);
    }

    openSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        console.log(this.sidebarOpen);
    }

    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    public logout(): void {
        this.authService.removeToken();
        this.router.navigate(['login']);
    }
}
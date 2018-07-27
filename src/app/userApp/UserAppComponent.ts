import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../common/auth/AuthService';

@Component({
    selector: 'app-user-app',
    templateUrl: './userApp.html',
    styleUrls: ['userApp.scss']
})

export class UserAppComponent {


    isHandset$: Observable<any> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver,
                private authService: AuthService) {
    }


    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }


}
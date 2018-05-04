import {Component, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './common/auth/AuthService';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(private authService: AuthService,
                translate: TranslateService) {
        translate.setDefaultLang('eng');
    }

    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }
}

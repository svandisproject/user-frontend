import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserAuthService} from '../../user/UserAuthService';
import {Router} from '@angular/router';
import {BlockUIService} from 'ng-block-ui';
import {finalize} from 'rxjs/internal/operators';
import {IpcService} from '../../electron/IpcService';
import {AdminDefaultRoute} from '../../../adminApp/AdminRouteConfig';

@Component({
    selector: 'app-login',
    templateUrl: 'loginPage.html',
    styleUrls: ['./loginPage.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LoginPageComponent {
    public email: string;
    public password: string;
    public credsInvalid = false;
    public readonly BLOCK_UI_INSTANCE_NAME = 'loginLoading';

    @ViewChild('form') form: NgForm;

    constructor(private userService: UserAuthService,
                private blockUIService: BlockUIService,
                private ipcService: IpcService,
                private router: Router) {
    }

    public login(form: NgForm) {
        if (form.valid) {
            this.blockUIService.start(this.BLOCK_UI_INSTANCE_NAME);
            this.userService.signIn({
                username: this.email,
                password: this.password
            })
                .pipe(finalize(() => this.blockUIService.stop(this.BLOCK_UI_INSTANCE_NAME)))
                .subscribe(
                    (res) => {
                        if (this.userService.hasRoleAdmin()) {
                            this.router.navigate(AdminDefaultRoute);
                        } else {
                            this.router.navigate(['']);
                        }
                    },
                    err => this.handleFormError(form)
                );
        }
    }

    public isDesktop(): boolean {
        return window['require'];
    }

    private handleFormError(form: NgForm) {
        form.controls.password.setErrors({'incorrect': true});
        this.credsInvalid = true;
    }
}

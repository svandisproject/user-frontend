import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../user/UserService';
import {Router} from '@angular/router';
import {BlockUIService} from 'ng-block-ui';
import {finalize} from 'rxjs/internal/operators';
import {IpcService} from '../../electron/IpcService';

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

    constructor(private userService: UserService,
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
                            this.router.navigate(['admin']);
                        } else {
                            this.router.navigate([''])
                                .then(() => this.ipcService.send('startWorker'));
                        }
                    },
                    err => this.handleFormError(form)
                );
        }
    }

    private handleFormError(form: NgForm) {
        form.controls.email.setErrors({'incorrect': true});
        form.controls.password.setErrors({'incorrect': true});
        this.credsInvalid = true;
    }
}

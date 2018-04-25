import {Component, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../user/UserService';

@Component({
    selector: 'app-login',
    templateUrl: 'loginPage.html',
    styleUrls: ['./loginPage.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LoginPageComponent {
    public email: string;
    public password: string;

    constructor(private userService: UserService) {
    }

    public login(form: NgForm) {
        if (form.valid) {
            this.userService.signIn({
                username: this.email,
                password: this.password
            }).subscribe(res => console.log(res));
        }
    }
}

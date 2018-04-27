import {$, ElementFinder} from 'protractor';

export class Login {

    public static getLoginText() {
        return $('app-root #login-title').getText();
    }

    public static signIn(user: string, password: string) {
        const emailInput: ElementFinder = $('#user-email');
        const passwordInput: ElementFinder = $('#user-password');
        const submitButton: ElementFinder = $('#login-submit');

        emailInput.sendKeys(user);
        passwordInput.sendKeys(password);

        submitButton.click();
    }
}

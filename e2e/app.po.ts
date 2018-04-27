import {$} from 'protractor';

export class AppPage {
    public static getLoginText() {
        return $('app-root #login-title').getText();
    }
}

import {$, browser} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

    getLoginText() {
        return $('app-root #login-title').getText();
  }
}

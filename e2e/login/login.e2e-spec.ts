import {$, browser} from 'protractor';
import {Login} from './Login.po';
import {AssertUtils} from '../utilis/AssertUtils';
import assertPresent = AssertUtils.assertPresent;

describe('svandis-client Login', () => {

    it('should show login form', () => {
        browser.get('/');
        expect(Login.getLoginText()).toEqual('SVANDIS Login');
    });

    it('should be able to login', () => {
        Login.signIn('user@apimonster.com', 'user');
        assertPresent($('#news-feed-title'));
        browser.waitForAngularEnabled(false);
    });
});

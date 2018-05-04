import {$, browser} from 'protractor';
import {Login} from './Login.po';
import {AssertUtils} from '../utilis/AssertUtils';
import assertPresent = AssertUtils.assertPresent;
import assertNotPresent = AssertUtils.assertNotPresent;

describe('svandis-client Login', () => {

    it('should show login form', () => {
        browser.get('/');
        expect(Login.getLoginText()).toEqual('SVANDIS Login');
    });

    it('should hide navigation', () => {
        assertNotPresent($('header'));
    });

    it('should be able to login', () => {
        Login.signIn('user@apimonster.com', 'user');
        assertPresent($('#news-feed-title'));
        browser.waitForAngularEnabled(false);
    });
});

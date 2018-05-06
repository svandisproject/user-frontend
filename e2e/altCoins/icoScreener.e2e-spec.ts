import {browser} from 'protractor';
import {IcoScreener} from './IcoScreener';
import {AssertUtils} from '../utilis/AssertUtils';

describe('svandis-client Ico Screener', () => {

    it('should be on ico screener page', () => {
        browser.get(IcoScreener.ROUTE);
        expect(IcoScreener.getTitle()).toEqual('ICO Screener');
    });
});

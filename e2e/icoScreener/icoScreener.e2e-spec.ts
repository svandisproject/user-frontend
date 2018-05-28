import {browser} from 'protractor';
import {IcoScreener} from './IcoScreener';
import {AssertUtils} from '../utilis/AssertUtils';
import assertSelected = AssertUtils.assertSelected;

describe('svandis-client Ico Screener', () => {

    it('should be on ico screener page', () => {
        browser.get(IcoScreener.ROUTE);
        expect(IcoScreener.getTitle()).toEqual('ICO Screener');
    });

    it('should be able to save filters', () => {
        IcoScreener.openFilterTable();

        IcoScreener.getSelectFilterNthOption('form-label-1', 3).click();
        IcoScreener.getSelectFilterNthOption('form-label-2', 3).click();
        IcoScreener.getSelectFilterNthOption('form-label-3', 3).click();

        browser.get(IcoScreener.ROUTE);
        browser.sleep(2000);

        IcoScreener.openFilterTable();

        assertSelected(IcoScreener.getSelectFilterNthOption('form-label-1', 3));
        assertSelected(IcoScreener.getSelectFilterNthOption('form-label-2', 3));
        assertSelected(IcoScreener.getSelectFilterNthOption('form-label-3', 3));
    });
});

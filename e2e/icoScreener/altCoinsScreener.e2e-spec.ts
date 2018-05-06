import {browser} from 'protractor';
import {AltCoins} from './AltCoins';
import {AssertUtils} from '../utilis/AssertUtils';

describe('svandis-client Alt Coins Screener', () => {

    it('should be on ico screener page', () => {
        browser.get(AltCoins.ROUTE);
        expect(AltCoins.getTitle()).toEqual('Alt Coins Screener');
    });

    // TODO: Uncomment when data is available
    // it('should be able to save filters', () => {
    //     AltCoins.getSelectFilterNthOption('form-label-1', 3).click();
    //
    //     browser.get(AltCoins.ROUTE);
    //     browser.sleep(2000);
    //
    //     assertSelected(AltCoins.getSelectFilterNthOption('form-label-1', 3));
    // });
});

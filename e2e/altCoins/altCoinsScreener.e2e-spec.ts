import {AltCoins} from './AltCoins';

describe('svandis-client Alt Coins Screener', () => {

    it('should be on ico screener page', () => {
        AltCoins.getNavItem().click();
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

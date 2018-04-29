import {browser} from 'protractor';
import {NewsFeed} from './NewsFeed';
import {AssertUtils} from '../utilis/AssertUtils';
import assertDisplayed = AssertUtils.assertDisplayed;
import assertSelected = AssertUtils.assertSelected;

describe('svandis-client NewsFeed', () => {

    it('should be on news feed page', () => {
        browser.get(NewsFeed.ROUTE);
        expect(NewsFeed.getTitle()).toEqual('News feed');
    });

    it('should show latest news feeds', () => {
        browser.sleep(2000);
        expect(NewsFeed.getFeedList().count()).toBeGreaterThan(0);
    });

    describe('Filter block', () => {

        it('should open filter block', () => {
            NewsFeed.getFilterBlockToggleButton().click();
            assertDisplayed(NewsFeed.getFilterBlock());
        });

        it('should be able to save selected asset', () => {
            NewsFeed.getSelectFilterNthOption('assets', 3).click();

            browser.get(NewsFeed.ROUTE);
            browser.sleep(2000);

            assertSelected(NewsFeed.getSelectFilterNthOption('assets', 3));
        });

        it('should be able to save selected region', () => {
            NewsFeed.getFilterBlockToggleButton().click();
            NewsFeed.getSelectFilterNthOption('region', 3).click();

            browser.get(NewsFeed.ROUTE);
            browser.sleep(2000);

            assertSelected(NewsFeed.getSelectFilterNthOption('region', 3));
        });

        it('should be able to save Activity field filter', () => {
            NewsFeed.getFilterBlockToggleButton().click();
            const isSelected = {...NewsFeed.getActivityFilterItem('politics').isSelected()};
            NewsFeed.getActivityFilterItem('politics').click();

            browser.get(NewsFeed.ROUTE);
            browser.sleep(2000);
            NewsFeed.getFilterBlockToggleButton().click();

            expect(isSelected)
                .not.toEqual(NewsFeed.getActivityFilterItem('politics').isSelected());
        });

    });
});

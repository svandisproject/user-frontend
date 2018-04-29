import {$, $$, ElementArrayFinder, ElementFinder} from 'protractor';

export class NewsFeed {
    public static readonly ROUTE: string = '/';

    public static getTitle() {
        return $('app-root #news-feed-title').getText();
    }

    public static getFeedList(): ElementArrayFinder {
        return $$('#news-feed-list li');
    }

    public static getFilterBlockToggleButton(): ElementFinder {
        return $('#filter-block-toggle');
    }

    public static getFilterBlock(): ElementFinder {
        return $('#filter-block');
    }

    public static getSelectFilterNthOption(filterName: 'assets' | 'region', option: number): ElementFinder {
        return $(`#${filterName}-filter option:nth-child(${option})`);
    }

    public static getActivityFilterItem(activityItemName: string): ElementFinder {
        return $('#activity-filter-' + activityItemName);
    }
}

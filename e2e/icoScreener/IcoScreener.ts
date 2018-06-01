import {$, by, element, ElementFinder} from 'protractor';

export class IcoScreener {
    public static readonly ROUTE: string = '/user/ico';

    public static getTitle() {
        return $('app-root #general-screener-title').getText();
    }

    public static getSelectFilterNthOption(filterName: string, option: number): ElementFinder {
        return $(`#${filterName} option:nth-child(${option})`);
    }

    public static openFilterTable(): void {
        $('#filter-table-toggle').click();
    }

    public static getNavItem(): ElementFinder {
        return element(by.css(`a[href*="${IcoScreener.ROUTE}"]`));
    }
}

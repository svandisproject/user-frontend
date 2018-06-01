import {$, by, element, ElementFinder} from 'protractor';

export class AltCoins {
    public static readonly ROUTE: string = '/user/alt-coins';

    public static getTitle() {
        return $('app-root #general-screener-title').getText();
    }

    public static getSelectFilterNthOption(filterName: string, option: number): ElementFinder {
        return $(`#${filterName} option:nth-child(${option})`);
    }

    public static getNavItem(): ElementFinder {
        return element(by.css(`a[href*="${AltCoins.ROUTE}"]`));
    }
}

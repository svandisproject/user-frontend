import {$, ElementFinder} from 'protractor';

export class AltCoins {
    public static readonly ROUTE: string = '/alt-coins';

    public static getTitle() {
        return $('app-root #general-screener-title').getText();
    }

    public static getSelectFilterNthOption(filterName: string, option: number): ElementFinder {
        return $(`#${filterName} option:nth-child(${option})`);
    }
}

import {$, ElementFinder} from 'protractor';

export class IcoScreener {
    public static readonly ROUTE: string = '/ico';

    public static getTitle() {
        return $('app-root #general-screener-title').getText();
    }

    public static getSelectFilterNthOption(filterName: string, option: number): ElementFinder {
        return $(`#${filterName} option:nth-child(${option})`);
    }
}

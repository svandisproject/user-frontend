import {$} from 'protractor';

export class IcoScreener {
    public static readonly ROUTE: string = '/ico';

    public static getTitle() {
        return $('app-root #ico-screener-title').getText();
    }
}

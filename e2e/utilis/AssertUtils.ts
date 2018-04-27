import {browser, ElementFinder, ProtractorExpectedConditions} from 'protractor';
import {SpecConfig} from './SpecConfig';

export module AssertUtils {
    export function assertPresent(elementFinder: ElementFinder): void {
        expect(elementFinder.isPresent()).toBeTruthy();
    }

    export function assertNotPresent(elementFinder: ElementFinder): void {
        expect(elementFinder.isPresent()).toBeFalsy();
    }

    export function assertPathChangedTo(path: string, timeout: number = SpecConfig.TIMEOUT_VALUE_LOW): void {
        const expectedCondition: ProtractorExpectedConditions = browser.ExpectedConditions;
        browser.wait(expectedCondition.urlContains(path), timeout);
    }

    export function assertCurrentPage(path: string): void {
        browser.ExpectedConditions.urlContains(path);
    }

    export function assertEnabled(elementFinder: ElementFinder): void {
        expect(elementFinder.isEnabled()).toBeTruthy();
    }

    export function assertDisabled(elementFinder: ElementFinder): void {
        expect(elementFinder.isEnabled()).toBeFalsy();
    }
}

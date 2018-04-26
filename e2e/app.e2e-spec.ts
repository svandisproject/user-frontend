import {AppPage} from './app.po';

describe('svandis-client App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should show login form', () => {
        page.navigateTo();
        expect(page.getLoginText()).toEqual('Login');
    });
});

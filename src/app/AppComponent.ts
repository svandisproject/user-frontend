import {Component, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IpcService} from './common/electron/IpcService';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(translate: TranslateService, private ipcService: IpcService) {
        translate.setDefaultLang('eng');
    }

    start() {
        this.ipcService.send('startWorker', {token: 'string'});
    }
}

import {Component} from '@angular/core';
import {IpcService} from '../../common/electron/IpcService';


@Component({
    selector: 'app-worker-ui',
    templateUrl: './workerUI.html',
    styleUrls: ['./workerUI.scss']
})
export class WorkerUIComponent {
    public urls: string[] = [];
    public isUsingMiningApp = false;

    constructor(private ipcService: IpcService) {}

    public toggleConsentToTerms() {

    }

    public toggleUseMiningApp() {
        this.isUsingMiningApp = !this.isUsingMiningApp;

        if (this.isUsingMiningApp) {
            this.ipcService.send('startWorker', {token: 'string'});
        } else {
            this.ipcService.send('stopWorker');
        }

    }
}
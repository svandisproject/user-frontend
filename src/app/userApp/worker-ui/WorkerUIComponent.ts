import {Component} from '@angular/core';
import {IpcService} from '../../common/electron/IpcService';
import {AuthService} from '../../common/auth/AuthService';

@Component({
    selector: 'app-worker-ui',
    templateUrl: './workerUI.html',
    styleUrls: ['./workerUI.scss']
})
export class WorkerUIComponent {
    public urls: string[] = [];

    public isUsingMiningApp = false;

    constructor(private ipcService: IpcService,
                private authService: AuthService) {
    }

    public toggleConsentToTerms() {
    }

    public toggleUseMiningApp() {
        this.isUsingMiningApp = !this.isUsingMiningApp;
        if (this.isUsingMiningApp) {
            this.ipcService.send('startWorker', {token: this.authService.getCurrentJwtToken()});
        } else {
            this.ipcService.send('stopWorker');
        }

    }
}
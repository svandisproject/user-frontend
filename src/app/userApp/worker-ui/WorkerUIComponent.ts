import {Component, OnInit} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';

@Component({
    selector: 'app-worker-ui',
    templateUrl: './workerUI.html',
    styleUrls: ['./workerUI.scss']
})
export class WorkerUIComponent implements OnInit {
    public urls: string[] = [];

    public isWorkerRunning = false;
    public hasAcceptedTerms = false;

    constructor(private workerService: WorkerService) {
    }

    ngOnInit(): void {
        this.isWorkerRunning = this.workerService.isRuning();
    }

    public toggleUseMiningApp() {

        if (this.isWorkerRunning) {
            this.workerService.stopWorker();
        } else {
            this.workerService.startWorker();
        }

        this.isWorkerRunning = this.workerService.isRuning();
    }
}
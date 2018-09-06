import {Component, OnInit} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-worker-ui',
    templateUrl: './workerUI.html',
    styleUrls: ['./workerUI.scss']
})
export class WorkerUIComponent implements OnInit {
    public hasAcceptedTerms = false;
    public isRunning: boolean;

    constructor(private workerService: WorkerService) {
    }

    ngOnInit(): void {
        this.hasAcceptedTerms = this.isWorkerRunning();
        this.isRunning = this.isWorkerRunning();
    }

    public getStats(): Observable<string[]> {
        return this.workerService.onStatUpdate();
    }

    public toggleUseMiningApp() {
        if (this.workerService.getWorkerStatusSubject().getValue()) {
            this.workerService.stopWorker();
        } else {
            this.workerService.startWorker()
                .subscribe(() => this.workerService.restartWorkerSilently());
        }
    }

    public isWorkerRunning(): boolean {
        return this.workerService.getWorkerStatusSubject().getValue();
    }
}
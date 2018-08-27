import {Component, OnInit} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';
import {UserService} from '../../common/api/services/UserService';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-worker-ui',
    templateUrl: './workerUI.html',
    styleUrls: ['./workerUI.scss']
})
export class WorkerUIComponent implements OnInit {
    public urls: string[] = [];

    public hasAcceptedTerms = false;
    public isRunning: boolean;

    public userStatisticsSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private workerService: WorkerService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.hasAcceptedTerms = this.isWorkerRunning();
        this.isRunning = this.isWorkerRunning();
        this.userService.getWorkerStats()
            .subscribe((stats) => this.userStatisticsSubject.next(stats));
    }

    public toggleUseMiningApp() {
        if (this.workerService.getWorkerStatusSubject().getValue()) {
            this.workerService.stopWorker();
        } else {
            this.workerService.startWorker();
            this.workerService.restartWorkerSilently();
        }
    }

    public isWorkerRunning(): boolean {
        return this.workerService.getWorkerStatusSubject().getValue();
    }
}
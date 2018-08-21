import {Injectable} from '@angular/core';
import {WorkerResource} from '../resource/WorkerResource';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {IpcService} from '../../electron/IpcService';

@Injectable()
export class WorkerService {
    private workerStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private workerResource: WorkerResource,
                private ipcService: IpcService) {
    }

    public regenerate(): Observable<{ secret: string }> {
        return this.workerResource.regenerateToken();
    }

    public getSecret(): Observable<{ secret: string }> {
        return this.workerResource.getSecret();
    }

    public getWorkerStatusSubject(): BehaviorSubject<boolean> {
        return this.workerStatusSubject;
    }

    public startWorker(): void {
        this.getSecret().subscribe((secret) => {
            this.ipcService.send('startWorker', {token: secret.secret});
            this.workerStatusSubject.next(true);
        });
    }

    public stopWorker(): void {
        // this.ipcService.send('stopWorker');
        this.workerStatusSubject.next(false);
    }

    public isRunning(): Observable<boolean> {
        return this.workerStatusSubject.asObservable();
    }
}
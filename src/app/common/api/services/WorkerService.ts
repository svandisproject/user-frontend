import {Injectable} from '@angular/core';
import {WorkerResource} from '../resource/WorkerResource';
import {Observable} from 'rxjs/index';
import {IpcService} from '../../electron/IpcService';
import {AuthService} from '../../auth/AuthService';

@Injectable()
export class WorkerService {
    private isWorkerRunning: boolean;

    constructor(private workerResource: WorkerResource,
                private authService: AuthService,
                private ipcService: IpcService) {
    }

    public regenerate(): Observable<{ secret: string }> {
        return this.workerResource.regenerateToken();
    }

    public getSecret(): Observable<{ secret: string }> {
        return this.workerResource.getSecret();
    }

    public startWorker(): void {
        this.ipcService.send('startWorker', {token: this.authService.getCurrentJwtToken()});
        this.isWorkerRunning = true;
    }

    public stopWorker(): void {
        this.ipcService.send('stopWorker');
        this.isWorkerRunning = false;
    }

    public isRuning(): boolean {
        return this.isWorkerRunning;
    }
}
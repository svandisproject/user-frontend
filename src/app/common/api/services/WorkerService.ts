import {Injectable} from '@angular/core';
import {WorkerResource} from '../resource/WorkerResource';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs/index';
import {IpcService} from '../../electron/IpcService';
import {delay, map, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class WorkerService {
    private workerStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private workerRunSubscription: Subscription;
    private currentSecret: string;
    private readonly WORKER_RESTART_INTERVAL = 6000;

    constructor(private workerResource: WorkerResource,
                private ipcService: IpcService) {
    }

    public regenerate(): Observable<{ secret: string }> {
        return this.workerResource.regenerateToken()
            .pipe(
                switchMap((secret) => this.registerWorker(secret.secret)),
                map((res) => {
                    return {
                        secret: res.token
                    };
                })
            );
    }

    public getSecret(): Observable<{ secret: string }> {
        return this.workerResource.getSecret();
    }

    public getWorkerStatusSubject(): BehaviorSubject<boolean> {
        return this.workerStatusSubject;
    }

    public startWorker(): void {
        this.getSecret().subscribe((secret) => {
            this.currentSecret = secret.secret;
            this.ipcService.send('startWorker', {token: secret.secret});
            this.workerStatusSubject.next(true);
        });
    }

    public registerWorker(secret: string): Observable<{ token: string }> {
        return this.workerResource.registerWorker(secret);
    }

    public stopWorker(): void {
        this.workerRunSubscription.unsubscribe();
        this.ipcService.send('stopWorker');
        this.workerStatusSubject.next(false);
    }

    public restartWorkerSilently() {

        if (!this.currentSecret) {
            console.error('no secret');
            return;
        }

        this.workerRunSubscription = interval(this.WORKER_RESTART_INTERVAL)
            .pipe(
                tap(() => this.ipcService.send('stopWorker')),
                delay(4000),
                tap(() => this.ipcService.send('startWorker', {token: this.currentSecret}))
            )
            .subscribe();

    }

    public isRunning(): Observable<boolean> {
        return this.workerStatusSubject.asObservable();
    }
}
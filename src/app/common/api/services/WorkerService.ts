import {Injectable} from '@angular/core';
import {WorkerResource} from '../resource/WorkerResource';
import {BehaviorSubject, interval, Observable, Subject, Subscription} from 'rxjs/index';
import {IpcService} from '../../electron/IpcService';
import {delay, tap} from 'rxjs/operators';
import {Socket} from 'ng-socket-io';

@Injectable()
export class WorkerService {
    private workerStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private workerRunSubscription: Subscription;
    private currentWorkerToken: string;
    private readonly WORKER_RESTART_INTERVAL = 150000;
    private statSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);

    constructor(private workerResource: WorkerResource,
                private socket: Socket,
                private ipcService: IpcService) {
    }

    public regenerate(): Observable<{ secret: string }> {
        return this.workerResource.regenerateToken()
            .pipe(
                tap((secret) => this.registerWorker(secret.secret).subscribe()),
            );
    }

    public getSecret(): Observable<{ secret: string }> {
        return this.workerResource.getSecret();
    }

    public onStatUpdate(): Observable<string[]> {
        this.socket.on('statUpdate', (urls) => {
            this.statSubject.next(urls);
        });

        return this.statSubject.asObservable();
    }

    public getWorkerStatusSubject(): BehaviorSubject<boolean> {
        return this.workerStatusSubject;
    }

    public startWorker(): Observable<void> {
        const subject = new Subject<void>();
        this.getSecret().subscribe((secret) => {
            this.registerWorker(secret.secret).subscribe(() => {
                this.ipcService.send('startWorker', {token: this.currentWorkerToken});
                this.workerStatusSubject.next(true);
                subject.next();
                subject.complete();
            });
        });

        return subject.asObservable();
    }

    public registerWorker(secret: string): Observable<{ token: string }> {
        return this.workerResource.registerWorker(secret)
            .pipe(tap((token) => this.currentWorkerToken = token.token));
    }

    public stopWorker(): void {
        this.workerRunSubscription.unsubscribe();
        this.ipcService.send('stopWorker');
        this.workerStatusSubject.next(false);
    }

    public restartWorkerSilently() {

        if (!this.currentWorkerToken) {
            console.error('no secret');
            return;
        }

        this.workerRunSubscription = interval(this.WORKER_RESTART_INTERVAL)
            .pipe(
                tap(() => this.ipcService.send('stopWorker')),
                delay(5000),
                tap(() => this.ipcService.send('startWorker', {token: this.currentWorkerToken}))
            )
            .subscribe();

    }

    public isRunning(): Observable<boolean> {
        return this.workerStatusSubject.asObservable();
    }
}
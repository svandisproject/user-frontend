import {Injectable} from '@angular/core';
import {WorkerResource} from '../resource/WorkerResource';
import {Observable} from 'rxjs/index';

@Injectable()
export class WorkerService {

    constructor(private workerResource: WorkerResource) {
    }

    public regenerate(): Observable<{ secret: string }> {
        return this.workerResource.regenerateToken();
    }

    public getSecret(): Observable<{ secret: string }> {
        return this.workerResource.getSecret();
    }
}
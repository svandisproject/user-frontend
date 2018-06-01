import {Injectable} from '@angular/core';
import {SvandisApi} from '../config/SvandisApi';
import {Observable} from 'rxjs/index';
import {HttpService} from '../../http/HttpService';

@Injectable()
export class WorkerResource {
    private readonly URL = SvandisApi.API_URL + '/settings/worker';

    constructor(private httpService: HttpService) {
    }

    public regenerateToken(): Observable<{ secret: string }> {
        return this.httpService.post(this.URL + '/regenerate-user-token');
    }

    public getSecret(): Observable<{ secret: string }> {
        return this.httpService.get(this.URL + '/secret');
    }
}
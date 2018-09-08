import {Injectable} from '@angular/core';
import {HttpService} from '../../http/HttpService';

@Injectable()
export class UserResource {
    private readonly URL = 'https://svandis-socket-server.herokuapp.com/statistics/';

    constructor(private httpService: HttpService) {
    }

    public findCrawled() {
        return this.httpService.get(this.URL);
    }
}
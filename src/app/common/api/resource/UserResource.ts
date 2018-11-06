import {Injectable} from '@angular/core';
import {HttpService} from '../../http/HttpService';

@Injectable()
export class UserResource {
    private readonly STATISTICS_URL = 'https://svandis-socket-server.herokuapp.com/statistics/';
    private readonly USER_ME_URL = 'https://svandis-api-prod.herokuapp.com/api/user/me';

    constructor(private httpService: HttpService) {
    }

    public findCrawled() {
        return this.httpService.get(this.STATISTICS_URL);
    }

    public getCurrentUserInfo() {
        return this.httpService.get(this.USER_ME_URL);
    }
}
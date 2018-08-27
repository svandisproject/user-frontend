import {Injectable} from '@angular/core';
import {UserResource} from '../resource/UserResource';

@Injectable()
export class UserService {

    constructor(private userResource: UserResource) {
    }

    public getWorkerStats() {
        return this.userResource.findCrawled();
    }
}
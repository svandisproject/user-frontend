import {Component} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';

@Component({
    selector: 'app-user-profile-details',
    templateUrl: './userProfileDetails.html'
})

export class UserProfileDetailsComponent {
    public secret: string;
    public isMasked = true;

    constructor(private workerService: WorkerService) {
        this.workerService.getSecret().subscribe(res => this.setSecret(res));
    }

    public regenerateToken(): void {
        this.workerService.regenerate().subscribe(res => this.setSecret(res));
    }

    private setSecret(response: { secret: string }) {
        this.secret = response.secret;
    }
}
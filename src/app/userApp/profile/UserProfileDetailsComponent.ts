import {Component} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';
import {Web3Service} from '../web3/Web3Service';

@Component({
    selector: 'app-user-profile-details',
    templateUrl: './userProfileDetails.html',
    styles: ['mat-icon {cursor: pointer}']
})

export class UserProfileDetailsComponent {
    public secret: string;
    public isMasked = true;
    public showOnBoardingTour = true;

    constructor(private workerService: WorkerService, private web3Service: Web3Service) {
        this.workerService.getSecret().subscribe(res => this.setSecret(res));
        this.web3Service.getIsOnboarded()
            .subscribe((data) => {this.showOnBoardingTour = !data; });
    }

    public regenerateToken(): void {
        this.workerService.regenerate()
            .subscribe((res) => this.setSecret(res));
    }

    private setSecret(response: { secret: string }) {
        this.secret = response.secret;
    }
}
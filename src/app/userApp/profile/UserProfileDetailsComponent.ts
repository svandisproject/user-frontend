import {Component, OnInit} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';
import {ResearchOnboardingComponent} from '../onboarding/researchOnboardingComponent';
import {Web3Config} from '../../config/Web3Config';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Web3Service} from '../web3/Web3Service';

@Component({
    selector: 'app-user-profile-details',
    templateUrl: './userProfileDetails.html',
    styles: ['mat-icon {cursor: pointer}']
})

export class UserProfileDetailsComponent implements OnInit {
    public secret: string;
    public isMasked = true;
    public showOnBoardingTour = true;

    constructor(private workerService: WorkerService, private web3Service: Web3Service) {
        this.workerService.getSecret().subscribe(res => this.setSecret(res));
        this.showOnBoardingTour = this.web3Service.isOnboarded.getValue();
    }

    public regenerateToken(): void {
        this.workerService.regenerate().subscribe(res => this.setSecret(res));
    }

    private setSecret(response: { secret: string }) {
        this.secret = response.secret;
    }

    ngOnInit() {
        this.web3Service.isOnboarded$.subscribe(
            data => {
                this.showOnBoardingTour = !data;
            });
    }
}
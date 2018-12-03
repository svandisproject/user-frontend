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
    public isOnboarded = false;
    public isCentralized = false;
    public hasKey = false;
    public showOnBoardingTour: boolean;
    // public returnedSigHash: string;
    // public returnedSvandisSigHash: string;

    public connectionStatus: boolean;
    constructor(private workerService: WorkerService, private web3Service: Web3Service) {
        this.workerService.getSecret().subscribe(res => this.setSecret(res));
        this.showOnBoardingTour = this.toggleShowOnboardingTour();
        this.connectionStatus = this.web3Service.walletStatus.getValue();
    }

    public regenerateToken(): void {
        this.workerService.regenerate().subscribe(res => this.setSecret(res));
    }

    private setSecret(response: { secret: string }) {
        this.secret = response.secret;
    }

    // Activate Research Onboarding Component or the ETH key management tools at this point
    public toggleShowOnboardingTour(): boolean {
        // TODO: Start some type of spinner
        if (this.web3Service.isOnboarded()) {
            this.hasKey = true;
            // Check if the user is onboarded or not
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.web3Service.walletStatus$.subscribe(
            data => {
                this.connectionStatus = data;
            });
    }
}
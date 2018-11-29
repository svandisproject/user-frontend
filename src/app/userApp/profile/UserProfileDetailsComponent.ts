import {Component} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';
import {ResearchOnboardingComponent} from '../onboarding/researchOnboardingComponent';
import {Web3Config} from '../../config/Web3Config';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-user-profile-details',
    templateUrl: './userProfileDetails.html',
    styles: ['mat-icon {cursor: pointer}']
})

export class UserProfileDetailsComponent {
    public secret: string;
    public isMasked = true;
    public isOnboarded = false;
    public isCentralized = false;
    public hasKey = false;
    public showOnBoardingTour: boolean;
    // public returnedSigHash: string;
    // public returnedSvandisSigHash: string;

    constructor(private workerService: WorkerService) {
        this.workerService.getSecret().subscribe(res => this.setSecret(res));
        this.showOnBoardingTour = this.toggleShowOnboardingTour();
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
        if (this.getKeyEncrypted()) {
            this.hasKey = true;
            // Check if the user is onboarded or not
            return false;
        }
        return true;
    }

    private getKeyEncrypted(): string {
        return localStorage.getItem(Web3Config.ENCRYPTED_PRV_KEY);
    }

}
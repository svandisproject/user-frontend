import {Component} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';

@Component({
    selector: 'app-user-profile-details',
    templateUrl: './userProfileDetails.html',
    styles: ['mat-icon {cursor: pointer}']
})

export class UserProfileDetailsComponent {
    public secret: string;
    public isMasked = true;
    // public returnedSigHash: string;
    // public returnedSvandisSigHash: string;

    constructor(private workerService: WorkerService) {
        this.workerService.getSecret().subscribe(res => this.setSecret(res));
    }

    public regenerateToken(): void {
        this.workerService.regenerate().subscribe(res => this.setSecret(res));
    }

    private setSecret(response: { secret: string }) {
        this.secret = response.secret;
    }
    // public createNewEthResearchUser(): void {
    //     this.web3Service.signNewUser().subscribe(returnedSig => this.returnedSigHash = returnedSig);
    // }
    //
    // public createSignedSvandisData(): void {
    //     this.web3Service.signSvandisData().subscribe(returnedSig => this.returnedSvandisSigHash = returnedSig);
    // }
}
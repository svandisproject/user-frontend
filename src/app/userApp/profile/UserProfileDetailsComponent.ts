import {Component} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';
import {Web3Service} from '../../common/web3/Web3Service';

@Component({
    selector: 'app-user-profile-details',
    templateUrl: './userProfileDetails.html',
    styles: ['mat-icon {cursor: pointer}']
})

export class UserProfileDetailsComponent {
    public secret: string;
    public isMasked = true;
    public returnedHash: string;
    public returnedSvandisHash: string;

    constructor(private workerService: WorkerService, private web3Service: Web3Service) {
        this.workerService.getSecret().subscribe(res => this.setSecret(res));

    }

    public regenerateToken(): void {
        this.workerService.regenerate().subscribe(res => this.setSecret(res));
    }

    private setSecret(response: { secret: string }) {
        this.secret = response.secret;
    }

    public createNewEthResearchUser(): void {
        this.web3Service.signNewUser().then(returnedHash => this.returnedHash = returnedHash);

    }

    public createSignedSvandisData(): void {
        this.web3Service.signSvandisData().then(returnedSvandisHash => this.returnedSvandisHash = returnedSvandisHash);

    }
}
import {Component, OnInit} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {Web3Service} from '../web3/Web3Service';

@Component({
    selector: 'app-rc-onboarding',
    templateUrl: './researchOnboarding.html',
    styleUrls: ['./researchOnboarding.scss']
})

export class ResearchOnboardingComponent {
    public secret: string;
    public acceptedTerms = false;
    public expertSelected = false;
    public beginnerButtonStyle = 'highlight-button';
    public expertButtonStyle = 'unselected-button';

    public isFacebookAuthenticated = false;
    public isGoogleAuthenticated = false;
    public isTwitterAuthenticated = false;
    public isKyc = false;

    public recoveryAddress = '';
    public password = '';
    isLinear = true;

    constructor(private workerService: WorkerService, private _formBuilder: FormBuilder, private web3Service: Web3Service) {
        this.workerService.getSecret()
            .subscribe((res) => this.setSecret(res));
    }

    private setSecret(response: { secret: string }) {
        this.secret = response.secret;
    }

    public toggleButton() {
        const intermediate = this.beginnerButtonStyle;
        this.beginnerButtonStyle = this.expertButtonStyle;
        this.expertButtonStyle = intermediate;
        this.expertSelected = !this.expertSelected;
        this.acceptedTerms = false;
    }

    public createNewEthResearchUser(): void {
        this.web3Service.createNewWalletAndStoreKey(this.expertSelected, this.password, this.recoveryAddress);
    }

    public resetDemo(): void {
        this.web3Service.resetTheDemo();
    }

    public authenticateFacebook(): void {
        this.isFacebookAuthenticated = !this.isFacebookAuthenticated;
    }

    public authenticateTwitter(): void {
        this.isTwitterAuthenticated = !this.isTwitterAuthenticated;
    }

    public authenticateGoogle(): void {
        this.isGoogleAuthenticated = !this.isGoogleAuthenticated;
    }

    public authenticateKyc(): void {
        this.isKyc = !this.isKyc;
    }

    public downloadKeystore(): void {
        this.web3Service.downloadMyLocalKeystore();
    }

    public expertSelectedAndisValidEthAddress(): boolean {
        if (!this.expertSelected) {
            return false;
        }
        return this.web3Service.isEthereumAddress(this.recoveryAddress);
    }

    public finalizeTour() {
        location.reload();
    }
}
import {Component, OnInit} from '@angular/core';
import {WorkerService} from '../../common/api/services/WorkerService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {Web3Service} from '../web3/Web3Service';

@Component({
    selector: 'app-rc-onboarding',
    templateUrl: './researchOnboarding.html',
    styles: ['mat-icon {cursor: pointer}'],
    styleUrls: ['./researchOnboarding.scss']
})

export class ResearchOnboardingComponent implements OnInit {
    public secret: string;
    public acceptedTerms = false;
    public expertSelected = false;
    public beginnerButtonStyle = 'highlight-button';
    public expertButtonStyle = 'unselected-button';
    public returnedSigHash: string;
    public returnedSvandisSigHash: string;

    public isFacebookAuthenticated = false;
    public isGoogleAuthenticated = false;
    public isTwitterAuthenticated = false;
    public isKyc = false;

    public recoveryAddress = '';
    public password = '';
    isLinear = true;

    constructor(private workerService: WorkerService, private _formBuilder: FormBuilder, private web3Service: Web3Service) {
        this.workerService.getSecret().subscribe(res => this.setSecret(res));
    }

    ngOnInit() {
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
        this.web3Service.createNewWalletAndStoreKey(this.password);
        this.web3Service.signNewUser(
            this.expertSelected,
            '0x0',
            this.password).subscribe(returnedSig => this.returnedSigHash = returnedSig);
        this.password = '';
    }

    public resetDemo(): void {
        this.web3Service.resetThis();
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
        this.web3Service.downloadMyKeystore();
    }

    public expertSelectedAndisValidEthAddress(): boolean {
        if (!this.expertSelected) {
            return false;
        }
        return this.web3Service.isEthereumAddress(this.recoveryAddress);
    }
}
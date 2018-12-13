import {Injectable} from '@angular/core';
import {BlockchainApiResource} from './BlockchainApiResource';
import {Observable} from 'rxjs';

@Injectable()
export class BlockchainApiService {
    constructor(private blockchainApiResource: BlockchainApiResource) {}

    public blockchainUser(generatedUserAddressSignature: string, providedRecoveryAddress?: string): Observable<String[]> {
        if (providedRecoveryAddress) {
            return this.blockchainApiResource.blockchainUser(generatedUserAddressSignature, providedRecoveryAddress);
        } else {
            return this.blockchainApiResource.blockchainCentralizedUser(generatedUserAddressSignature);
        }
    }

    public convertBlockchainBeginnerCentralizedUser(userCurrentAddress: string, userNewRecoveryAddress: string): Observable<String[]> {
        return this.blockchainApiResource.convertBlockchainBeginnerCentralizedUser(userCurrentAddress, userNewRecoveryAddress);
    }

    public addDeviceCentralizedUser(userCurrentAddress: string, userNewSignedAddress: string): Observable<String[]> {
        return this.blockchainApiResource.convertBlockchainBeginnerCentralizedUser(userCurrentAddress, userNewSignedAddress);
    }

    public swapDevicesCentralizedUser(userCurrentAddress: string, userNewSignedAddress: string): Observable<String[]> {
        return this.blockchainApiResource.convertBlockchainBeginnerCentralizedUser(userCurrentAddress, userNewSignedAddress);
    }

    public resetDemo(userId: string): Observable<String[]> {
        return this.blockchainApiResource.resetDemo(userId);
    }
}
import {Injectable} from '@angular/core';
import {BlockchainApiResource} from './BlockchainApiResource';
import {Observable} from 'rxjs';

@Injectable()
export class BlockchainApiService {
    constructor(private blockchainApiResource: BlockchainApiResource) {}

    public blockchainUser(generatedUserAddressSignature: string, providedRecoveryAddress: string): Observable<String[]> {
        return this.blockchainApiResource.blockchainUser(generatedUserAddressSignature, providedRecoveryAddress);
    }

    public blockchainCentralizedUser(generatedUserAddressSignature: string): Observable<String[]> {
        return this.blockchainApiResource.blockchainCentralizedUser(generatedUserAddressSignature);
    }
}
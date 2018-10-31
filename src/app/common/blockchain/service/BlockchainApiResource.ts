import {Injectable} from '@angular/core';
import {HttpService} from '../../http/HttpService';
import {BlockchainApi} from '../../api/config/BlockchainApi';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class BlockchainApiResource {
    private readonly URL = BlockchainApi.API_URL;

    constructor(private httpService: HttpService) {}

    public blockchainUser(generatedUserAddressSignature: string, providedRecoveryAddress: string): Observable<String[]> {
        return this.httpService.post(this.URL + '/blockchain-user',
            {userAddressSignature: generatedUserAddressSignature, recoveryAddress: providedRecoveryAddress},
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            });
    }
    public blockchainCentralizedUser(generatedUserAddressSignature: string): Observable<String[]> {
        return this.httpService.post(this.URL + '/blockchain-centralized-user',
            {userAddressSignature: generatedUserAddressSignature},
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
            });
    }
}

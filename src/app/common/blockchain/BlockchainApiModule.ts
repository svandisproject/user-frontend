import {BlockchainApiService} from './service/BlockchainApiService';
import {NgModule} from '@angular/core';
import {BlockchainApiResource} from './service/BlockchainApiResource';

@NgModule({
    imports: [],
    providers: [
        BlockchainApiService,
        BlockchainApiResource
    ]
})
export class BlockchainApiModule {}

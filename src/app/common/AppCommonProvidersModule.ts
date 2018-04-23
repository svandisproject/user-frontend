import {NgModule} from '@angular/core';
import {HttpService} from './http/HttpService';
import {HttpClientModule} from '@angular/common/http';
import {AuthResource} from './auth/AuthResource';
import {AuthService} from './auth/AuthService';
import {PusherModule} from './pusher/PusherModule';

@NgModule({
    imports: [
        HttpClientModule,
        PusherModule
    ],
    providers: [
        HttpService,
        AuthResource,
        AuthService
    ]
})
export class AppCommonProvidersModule {
}

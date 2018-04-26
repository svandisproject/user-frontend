import {NgModule} from '@angular/core';
import {HttpService} from './http/HttpService';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthResource} from './auth/AuthResource';
import {AuthService} from './auth/AuthService';
import {PusherModule} from './pusher/PusherModule';
import {UserService} from './user/UserService';
import {AuthInterceptor} from './auth/AuthInterceptor';

@NgModule({
    imports: [
        HttpClientModule,
        PusherModule
    ],
    providers: [
        HttpService,
        UserService,
        AuthResource,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class AppCommonProvidersModule {
}

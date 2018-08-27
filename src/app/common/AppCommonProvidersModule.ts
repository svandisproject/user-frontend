import {NgModule} from '@angular/core';
import {HttpService} from './http/HttpService';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthResource} from './auth/AuthResource';
import {AuthService} from './auth/AuthService';
import {PusherModule} from './pusher/PusherModule';
import {UserAuthService} from './user/UserAuthService';
import {AuthInterceptor} from './auth/AuthInterceptor';
import {IpcService} from './electron/IpcService';
import {AuthGuard} from './guards/AuthGuard';
import {ElectronAppGuard} from './guards/ElectronAppGuard';

@NgModule({
    imports: [
        HttpClientModule,
        PusherModule
    ],
    providers: [
        HttpService,
        UserAuthService,
        AuthResource,
        IpcService,
        AuthGuard,
        ElectronAppGuard,
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

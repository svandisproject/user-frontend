import {NgModule} from '@angular/core';
import {HttpService} from './http/HttpService';
import {HttpClientModule} from '@angular/common/http';
import {AuthResource} from './auth/AuthResource';
import {AuthService} from './auth/AuthService';

/**
 * TODO: Remove comment when all understand this shit
 * Using a module for providers only , allows to avoid
 * imports of components which are not single tones
 */
@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        HttpService,
        AuthResource,
        AuthService
    ]
})
export class AppCommonProvidersModule {
}

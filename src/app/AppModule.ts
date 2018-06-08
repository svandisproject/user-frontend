import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './AppComponent';
import {RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppCommonProvidersModule} from './common/AppCommonProvidersModule';
import {AppCommonModule} from './common/AppCommonModule';
import {UserAppModule} from './userApp/UserAppModule';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminModule} from './adminApp/AdminModule';
import {MatPaginatorModule, MatTableModule} from '@angular/material';
import {BlockUIModule} from 'ng-block-ui';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppCommonModule,
        AppCommonProvidersModule,
        MatTableModule,
        MatPaginatorModule,
        AdminModule,
        BrowserModule,
        BlockUIModule.forRoot(),
        HttpClientModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient),
                deps: [HttpClient]
            }
        }),
        UserAppModule,
        BrowserAnimationsModule
    ],
    exports: [
        AppCommonProvidersModule,
        TranslateModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

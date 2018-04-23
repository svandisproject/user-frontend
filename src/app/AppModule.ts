import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './AppComponent';
import {FrontModule} from './front/FrontModule';
import {RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppCommonProvidersModule} from './common/AppCommonProvidersModule';
import {AppCommonModule} from './common/AppCommonModule';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppCommonModule,
        AppCommonProvidersModule,
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient),
                deps: [HttpClient]
            }
        }),
        FrontModule
    ],
    exports: [
        AppCommonProvidersModule,
        TranslateModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

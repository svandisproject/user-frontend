import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './AppComponent';
import {RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppCommonProvidersModule} from './common/AppCommonProvidersModule';
import {AppCommonModule} from './common/AppCommonModule';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatPaginatorModule, MatTableModule} from '@angular/material';
import {BlockUIModule} from 'ng-block-ui';
import {AppRouting} from './AppRouting';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppCommonModule,
        AppCommonProvidersModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserModule,
        BlockUIModule.forRoot(),
        HttpClientModule,
        RouterModule.forRoot(AppRouting),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient),
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule
    ],
    exports: [
        AppCommonProvidersModule,
        TranslateModule
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {duration: 3500}
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

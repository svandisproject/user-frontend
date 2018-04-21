import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './AppComponent';
import {FrontModule} from './front/FrontModule';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        FrontModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './AppComponent';
import {UserFrontModule} from './user-front/UserFrontModule';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        UserFrontModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

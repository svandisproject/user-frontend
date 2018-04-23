import {NgModule} from '@angular/core';
import {FrontNavigationComponent} from './front-navigation/FrontNavigationComponent';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        TranslateModule
    ],
    exports: [FrontNavigationComponent],
    declarations: [FrontNavigationComponent],
})
export class NavigationModule {
}

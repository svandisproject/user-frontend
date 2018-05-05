import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {NavigationComponent} from './front-navigation/NavigationComponent';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        TranslateModule
    ],
    exports: [NavigationComponent],
    declarations: [NavigationComponent],
})
export class NavigationModule {
}

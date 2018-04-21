import {NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {FrontRouterConfig} from './FrontRouterConfig';

@NgModule({
    imports: [
        RouterModule.forChild(FrontRouterConfig)
    ],
    declarations: [
        NewsFeedComponent
    ]
})
export class FrontModule {
}

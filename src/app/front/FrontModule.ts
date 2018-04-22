import {NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {FrontRouterConfig} from './FrontRouterConfig';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';

@NgModule({
    imports: [
        RouterModule.forChild(FrontRouterConfig),
        TranslateModule
    ],
    declarations: [
        NewsFeedComponent,
        FeedListComponent
    ]
})
export class FrontModule {
}

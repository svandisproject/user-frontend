import {NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {FrontRouterConfig} from './FrontRouterConfig';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';
import {CommonModule} from '@angular/common';
import {SvandisApiModule} from '../svandisApi/SvandisApiModule';
import {AppCommonModule} from '../common/AppCommonModule';

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        SvandisApiModule,
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

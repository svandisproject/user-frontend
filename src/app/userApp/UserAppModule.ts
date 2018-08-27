import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';
import {CommonModule} from '@angular/common';
import {AppCommonModule} from '../common/AppCommonModule';
import {SearchFilterComponent} from './newsFeed/searchFilter/SearchFilterComponent';
import {FormsModule} from '@angular/forms';
import {GeneralScreenerComponent} from './screener/GeneralScreenerComponent';
import {NouisliderModule} from 'ng2-nouislider';
import {UserAppRouterConfig} from './UserAppRouterConfig';
import {SearchFilterService} from '../common/filters/SearchFilterService';
import {FilterInitFactory} from './initializers/FilterInitFactory';
import {IcoScreenerComponent} from './screener/ico/IcoScreenerComponent';
import {AltCoinScreenerComponent} from './screener/altCoin/AltCoinScreenerComponent';
import {IcoFilterService} from '../common/filters/IcoFilterService';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {UserAppComponent} from './UserAppComponent';
import {FeedListLargeComponent} from './newsFeed/feedList/FeedListLargeComponent';
import {UserSidebarComponent} from './sidebar/UserSidebarComponent';
import {LayoutModule} from '@angular/cdk/layout';
import {NewsFeedResolver} from './newsFeed/NewsFeedResolver';
import {UserProfileDetailsComponent} from './profile/UserProfileDetailsComponent';
import {TagToolComponent} from './taggingTool/TagToolComponent';
import {SvandisApiModule} from '../common/api/SvandisApiModule';
import {WorkerUIComponent} from './worker-ui/WorkerUIComponent';
import {CommonMaterialModule} from '../common/material/CommonMaterialModule';
import {ScreenerColumnManagerComponent} from './screener/ScreenerColumnManagerComponent';

@NgModule({
    imports: [
        AppCommonModule,
        TranslateModule,
        CommonMaterialModule,
        LayoutModule,
        CommonModule,
        FormsModule,
        NouisliderModule,
        RouterModule.forChild(UserAppRouterConfig),
        InfiniteScrollModule,
        SvandisApiModule,
        TranslateModule
    ],
    declarations: [
        UserAppComponent,
        TagToolComponent,
        NewsFeedComponent,
        UserProfileDetailsComponent,
        WorkerUIComponent,
        SearchFilterComponent,
        GeneralScreenerComponent,
        IcoScreenerComponent,
        AltCoinScreenerComponent,
        UserSidebarComponent,
        FeedListComponent,
        FeedListLargeComponent,
        ScreenerColumnManagerComponent
    ],
    providers: [
        NewsFeedResolver,
        {
            provide: APP_INITIALIZER,
            useFactory: FilterInitFactory.factory,
            multi: true,
            deps: [SearchFilterService, IcoFilterService]
        }
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class UserAppModule {
}

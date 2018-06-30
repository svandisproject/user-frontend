import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';
import {CommonModule} from '@angular/common';
import {AppCommonModule} from '../common/AppCommonModule';
import {SearchFilterComponent} from './newsFeed/searchFilter/SearchFilterComponent';
import {AuthGuard} from '../common/guards/AuthGuard';
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
import {DataTableComponent} from './userDataTable/DataTableComponent';
import {UserAppComponent} from './UserAppComponent';
import {NavigationModule} from './navigation/NavigationModule';
import {FeedListLargeComponent} from './newsFeed/feedList/FeedListLargeComponent';
import {UserProfileDetailsComponent} from './profile/UserProfileDetailsComponent';
import {SvandisApiModule} from '../common/api/SvandisApiModule';
import {TagToolComponent} from './taggingTool/TagToolComponent';
import {NewsFeedResolver} from './newsFeed/NewsFeedResolver';

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        FormsModule,
        NavigationModule,
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
        SearchFilterComponent,
        DataTableComponent,
        GeneralScreenerComponent,
        IcoScreenerComponent,
        AltCoinScreenerComponent,
        FeedListComponent,
        FeedListLargeComponent
    ],
    providers: [
        AuthGuard,
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

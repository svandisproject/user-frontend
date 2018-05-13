import {APP_INITIALIZER, NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';
import {CommonModule} from '@angular/common';

import {AppCommonModule} from '../common/AppCommonModule';
import {SearchFilterComponent} from './newsFeed/searchFilter/SearchFilterComponent';
import {AuthGuard} from './guards/AuthGuard';
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

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        FormsModule,
        NouisliderModule,
        RouterModule.forChild(UserAppRouterConfig),
        InfiniteScrollModule,
        TranslateModule
    ],
    declarations: [
        NewsFeedComponent,
        SearchFilterComponent,
        GeneralScreenerComponent,
        IcoScreenerComponent,
        AltCoinScreenerComponent,
        FeedListComponent
    ],
    providers: [
        AuthGuard,
        {
            provide: APP_INITIALIZER,
            useFactory: FilterInitFactory.factory,
            multi: true,
            deps: [SearchFilterService, IcoFilterService]
        }
    ]
})
export class UserAppModule {
}

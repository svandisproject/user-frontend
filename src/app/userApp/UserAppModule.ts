import {APP_INITIALIZER, NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';
import {CommonModule} from '@angular/common';
import {AppCommonModule} from '../common/AppCommonModule';
import {SearchFilterComponent} from './newsFeed/searchFilter/SearchFilterComponent';
import {AuthGuard} from '../common/guards/AuthGuard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {UserProfileModule} from './profile/UserProfileModule';
import {FeedListLargeComponent} from './newsFeed/feedList/FeedListLargeComponent';
import {UserSidebarComponent} from './sidebar/UserSidebarComponent';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
    imports: [
        AppCommonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatToolbarModule,
        LayoutModule,
        CommonModule,
        UserProfileModule,
        FormsModule,
        NavigationModule,
        NouisliderModule,
        MatToolbarModule,
        RouterModule.forChild(UserAppRouterConfig),
        InfiniteScrollModule,
        TranslateModule
    ],
    declarations: [
        UserAppComponent,
        NewsFeedComponent,
        SearchFilterComponent,
        DataTableComponent,
        GeneralScreenerComponent,
        IcoScreenerComponent,
        AltCoinScreenerComponent,
        UserSidebarComponent,
        FeedListComponent,
        FeedListLargeComponent
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

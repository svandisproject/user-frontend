import {APP_INITIALIZER, NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';
import {CommonModule} from '@angular/common';

import {AppCommonModule} from '../common/AppCommonModule';
import {SearchFilterComponent} from './newsFeed/searchFilter/SearchFilterComponent';
import {CanActivateRouteGuard} from './CanActivateRouteGuard';
import {FormsModule} from '@angular/forms';
import {FilterSettingsInitFactory} from './initializers/FilterSettingsInitFactory';
import {ScreenerComponent} from './screener/ScreenerComponent';
import {FilterTableComponent} from './screener/filter-table/FilterTableComponent';
import {NouisliderModule} from 'ng2-nouislider';
import {UserAppRouterConfig} from './UserAppRouterConfig';
import {SearchFilterService} from '../common/filters/SearchFilterService';

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        FormsModule,
        NouisliderModule,
        RouterModule.forChild(UserAppRouterConfig),
        TranslateModule
    ],
    declarations: [
        NewsFeedComponent,
        SearchFilterComponent,
        FilterTableComponent,
        ScreenerComponent,
        FeedListComponent
    ],
    providers: [
        CanActivateRouteGuard,
        {
            provide: APP_INITIALIZER,
            useFactory: FilterSettingsInitFactory.factory,
            multi: true,
            deps: [SearchFilterService]
        }
    ]
})
export class UserAppModule {
}

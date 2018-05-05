import {APP_INITIALIZER, NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';
import {CommonModule} from '@angular/common';

import {AppCommonModule} from '../common/AppCommonModule';
import {FilterBlockComponent} from './newsFeed/filterBlock/FilterBlockComponent';
import {CanActivateRouteGuard} from './CanActivateRouteGuard';
import {FormsModule} from '@angular/forms';
import {FilterSettingsInitFactory} from './initializers/FilterSettingsInitFactory';
import {ScreenerComponent} from './screener/ScreenerComponent';
import {FilterTableComponent} from './screener/filter-table/FilterTableComponent';
import {NouisliderModule} from 'ng2-nouislider';
import {UserAppRouterConfig} from './UserAppRouterConfig';
import {SvandisApiModule} from '../common/api/SvandisApiModule';
import {FilterService} from '../common/api/services/FilterService';

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        FormsModule,
        SvandisApiModule,
        NouisliderModule,
        RouterModule.forChild(UserAppRouterConfig),
        TranslateModule
    ],
    declarations: [
        NewsFeedComponent,
        FilterBlockComponent,
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
            deps: [FilterService]
        }
    ]
})
export class UserAppModule {
}

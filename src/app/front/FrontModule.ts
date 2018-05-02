import {APP_INITIALIZER, NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {FrontRouterConfig} from './FrontRouterConfig';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';
import {CommonModule} from '@angular/common';
import {SvandisApiModule} from '../svandisApi/SvandisApiModule';
import {AppCommonModule} from '../common/AppCommonModule';
import {FilterBlockComponent} from './newsFeed/filterBlock/FilterBlockComponent';
import {CanActivateRouteGuard} from './CanActivateRouteGuard';
import {FormsModule} from '@angular/forms';
import {FilterSettingsInitFactory} from './initializers/FilterSettingsInitFactory';
import {FilterService} from '../svandisApi/services/FilterService';
import {ScreenerComponent} from './screener/ScreenerComponent';

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        FormsModule,
        SvandisApiModule,
        RouterModule.forChild(FrontRouterConfig),
        TranslateModule
    ],
    declarations: [
        NewsFeedComponent,
        FilterBlockComponent,
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
export class FrontModule {
}

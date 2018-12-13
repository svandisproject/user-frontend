import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FeedListComponent} from './newsFeed/feedList/FeedListComponent';
import {CommonModule} from '@angular/common';
import {AppCommonModule} from '../common/AppCommonModule';
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
import {UserSidebarComponent} from './sidebar/UserSidebarComponent';
import {LayoutModule} from '@angular/cdk/layout';
import {NewsFeedResolver} from './newsFeed/NewsFeedResolver';
import {UserProfileDetailsComponent} from './profile/UserProfileDetailsComponent';
import {TagToolComponent} from './taggingTool/TagToolComponent';
import {SvandisApiModule} from '../common/api/SvandisApiModule';
import {WorkerUIComponent} from './worker-ui/WorkerUIComponent';
import {CommonMaterialModule} from '../common/material/CommonMaterialModule';
import {ScreenerColumnManagerComponent} from './screener/ScreenerColumnManagerComponent';
import {ResearchOnboardingComponent} from './onboarding/researchOnboardingComponent';
import {EthConnectionPromptComponent} from './web3/connectionPrompt/ethConnectionPromptComponent';
import {NgArrayPipesModule} from 'ngx-pipes';
import {PostDetailsComponent} from './newsFeed/postDetails/PostDetailsComponent';
import {TagFilterComponent} from './newsFeed/tagFilter/TagFilterComponent';
import {LikeFilterComponent} from './newsFeed/likeFilter/LikeFilterComponent';
import {UserAppToolbarComponent} from './toolbar/UserAppToolbarComponent';
import {KeyManagementComponent} from './key-management/keyManagementComponent';
import {BeginnerKeyManagementComponent} from './key-management/Beginner/beginnerKeyManagement';
import {ExpertKeyManagementComponent} from './key-management/Expert/expertKeyManagement';
import {UserAuthService} from '../common/user/UserAuthService';

@NgModule({
    imports: [
        AppCommonModule,
        TranslateModule,
        CommonMaterialModule,
        LayoutModule,
        CommonModule,
        NgArrayPipesModule,
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
        GeneralScreenerComponent,
        IcoScreenerComponent,
        AltCoinScreenerComponent,
        UserAppToolbarComponent,
        UserSidebarComponent,
        PostDetailsComponent,
        TagFilterComponent,
        LikeFilterComponent,
        FeedListComponent,
        ResearchOnboardingComponent,
        KeyManagementComponent,
        BeginnerKeyManagementComponent,
        ExpertKeyManagementComponent,
        EthConnectionPromptComponent,
        ScreenerColumnManagerComponent
    ],
    providers: [
        UserAuthService,
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

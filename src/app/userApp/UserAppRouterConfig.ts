import {Route} from '@angular/router';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {AuthGuard} from '../common/guards/AuthGuard';
import {IcoScreenerComponent} from './screener/ico/IcoScreenerComponent';
import {AltCoinScreenerComponent} from './screener/altCoin/AltCoinScreenerComponent';
import {UserAppComponent} from './UserAppComponent';
import {UserProfileDetailsComponent} from './profile/UserProfileDetailsComponent';
import {NewsFeedResolver} from './newsFeed/NewsFeedResolver';
import {WorkerUIComponent} from './worker-ui/WorkerUIComponent';
import {ElectronAppGuard} from '../common/guards/ElectronAppGuard';
import {ResearchOnboardingComponent} from './onboarding/researchOnboardingComponent';

export const UserAppRouterConfig: Route[] = [
    {
        path: '', component: UserAppComponent, children: [
            {
                path: 'news-feed',
                component: NewsFeedComponent,
                canActivate: [AuthGuard],
                resolve: {
                    tagList: NewsFeedResolver
                }
            },
            {path: 'ico', component: IcoScreenerComponent, canActivate: [AuthGuard]},
            {path: 'alt-coins', component: AltCoinScreenerComponent, canActivate: [AuthGuard]},
            {path: 'profile', component: UserProfileDetailsComponent, canActivate: [AuthGuard]},
            {path: 'data-mining-app', component: WorkerUIComponent, canActivate: [AuthGuard, ElectronAppGuard]},
            {path: 'onboarding', component: ResearchOnboardingComponent, canActivate: [AuthGuard]}
        ],
    }
];

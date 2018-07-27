import {Route} from '@angular/router';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {LoginPageComponent} from '../common/pages/login/LoginPageComponent';
import {AuthGuard} from '../common/guards/AuthGuard';
import {IcoScreenerComponent} from './screener/ico/IcoScreenerComponent';
import {AltCoinScreenerComponent} from './screener/altCoin/AltCoinScreenerComponent';
import {UserAppComponent} from './UserAppComponent';
import {UserProfileDetailsComponent} from './profile/UserProfileDetailsComponent';
import {NewsFeedResolver} from './newsFeed/NewsFeedResolver';

export const UserAppRouterConfig: Route[] = [
    {
        path: 'user', component: UserAppComponent, children: [
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
            {path: 'profile', component: UserProfileDetailsComponent}
        ],
    },
    {path: 'login', component: LoginPageComponent},
    {path: '', redirectTo: 'user/news-feed', pathMatch: 'full'}
];

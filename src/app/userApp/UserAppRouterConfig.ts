import {Route} from '@angular/router';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {LoginPageComponent} from '../common/pages/login/LoginPageComponent';
import {AuthGuard} from './guards/AuthGuard';
import {IcoScreenerComponent} from './screener/ico/IcoScreenerComponent';
import {AltCoinScreenerComponent} from './screener/altCoin/AltCoinScreenerComponent';

export const UserAppRouterConfig: Route[] = [
    {path: '', component: NewsFeedComponent, canActivate: [AuthGuard]},
    {path: 'ico', component: IcoScreenerComponent, canActivate: [AuthGuard]},
    {path: 'alt-coins', component: AltCoinScreenerComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginPageComponent}
];

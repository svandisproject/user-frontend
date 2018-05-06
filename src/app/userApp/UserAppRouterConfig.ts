import {Route} from '@angular/router';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {LoginPageComponent} from '../common/pages/login/LoginPageComponent';
import {CanActivateRouteGuard} from './CanActivateRouteGuard';
import {IcoScreenerComponent} from './screener/IcoScreenerComponent';
import {AltCoinScreenerComponent} from './screener/AltCoinScreenerComponent';

export const UserAppRouterConfig: Route[] = [
    {path: '', component: NewsFeedComponent, canActivate: [CanActivateRouteGuard]},
    {path: 'ico', component: IcoScreenerComponent, canActivate: [CanActivateRouteGuard]},
    {path: 'alt-coins', component: AltCoinScreenerComponent, canActivate: [CanActivateRouteGuard]},
    {path: 'login', component: LoginPageComponent}
];

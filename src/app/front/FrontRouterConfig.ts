import {Route} from '@angular/router';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {LoginPageComponent} from '../common/pages/login/LoginPageComponent';
import {CanActivateRouteGuard} from './CanActivateRouteGuard';
import {ScreenerComponent} from './screener/ScreenerComponent';

export const FrontRouterConfig: Route[] = [
    {path: '', component: NewsFeedComponent, canActivate: [CanActivateRouteGuard]},
    {path: 'ico', component: ScreenerComponent, canActivate: [CanActivateRouteGuard]},
    {path: 'login', component: LoginPageComponent}
];

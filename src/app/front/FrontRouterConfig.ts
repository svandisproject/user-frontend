import {Route} from '@angular/router';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';
import {LoginPageComponent} from '../common/pages/login/LoginPageComponent';

export const FrontRouterConfig: Route[] = [
    {path: '', component: NewsFeedComponent},
    {path: 'login', component: LoginPageComponent}
];

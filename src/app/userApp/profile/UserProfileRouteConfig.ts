import {Route} from '@angular/router';
import {UserProfileDetailsComponent} from './details/UserProfileDetailsComponent';

export const UserProfileRouteConfig: Route[] = [
    {path: 'profile/user', component: UserProfileDetailsComponent}
];
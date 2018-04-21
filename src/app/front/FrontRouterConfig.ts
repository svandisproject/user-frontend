import {Route} from '@angular/router';
import {NewsFeedComponent} from './newsFeed/NewsFeedComponent';

export const FrontRouterConfig: Route[] = [
    {path: '', component: NewsFeedComponent}
];

import {Route} from '@angular/router';
import {TagGroupListComponent} from './list/TagGroupListComponent';

export const TagGroupsRouteConfig: Route[] = [
    {
        path: '',
        component: TagGroupListComponent,
    },
];
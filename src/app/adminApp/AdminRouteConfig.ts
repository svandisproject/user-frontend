import {Route} from '@angular/router';
import {AdminComponent} from './AdminComponent';
import {AuthGuard} from '../common/guards/AuthGuard';
import {TagListComponent} from './tags/TagListComponent';
import {EditWebFeedComponent} from './webFeed/edit/EditWebFeedComponent';
import {EditWebFeedResolver} from './webFeed/edit/EditWebFeedResolver';
import {WebFeedListComponent} from './webFeed/WebFeedListComponent';
import {EditTagComponent} from './tags/edit/EditTagComponent';
import {EditTagResolver} from './tags/edit/EditTagResolver';

export const AdminDefaultRoute = ['admin', 'posts'];
export const AdminRouteConfigs: Route[] = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'posts', loadChildren: './posts/PostsModule#PostsModule'},
            {path: 'tag-groups', loadChildren: './tagGroups/TagGroupsModule#TagGroupsModule'},
            {
                path: 'tags',
                component: TagListComponent,
            },
            {
                path: 'tags/edit/:id',
                component: EditTagComponent,
                resolve: {tag: EditTagResolver}
            },
            {
                path: 'tags/create',
                component: EditTagComponent,
            },
            {
                path: 'web-feeds',
                component: WebFeedListComponent,
            },
            {
                path: 'web-feeds/edit/:id',
                component: EditWebFeedComponent,
                resolve: {webFeed: EditWebFeedResolver}
            },
            {
                path: 'web-feeds/create',
                component: EditWebFeedComponent,
            }
        ]
    },
];

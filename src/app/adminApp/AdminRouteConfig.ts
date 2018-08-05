import {Route} from '@angular/router';
import {AdminComponent} from './AdminComponent';
import {PostListComponent} from './posts/PostListComponent';
import {AuthGuard} from '../common/guards/AuthGuard';
import {EditPostComponent} from './posts/edit/EditPostComponent';
import {EditPostResolver} from './posts/edit/EditPostResolver';
import {TagListComponent} from './tags/TagListComponent';
import {EditWebFeedComponent} from './webFeed/edit/EditWebFeedComponent';
import {EditWebFeedResolver} from './webFeed/edit/EditWebFeedResolver';
import {WebFeedListComponent} from './webFeed/WebFeedListComponent';
import {EditTagComponent} from './tags/edit/EditTagComponent';
import {EditTagResolver} from './tags/edit/EditTagResolver';

export const AdminRouteConfigs: Route[] = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'posts',
                component: PostListComponent,
            },
            {
                path: 'post/edit/:id',
                component: EditPostComponent,
                resolve: {post: EditPostResolver}
            },
            {
                path: 'post/create',
                component: EditPostComponent,
            },
            {
                path: 'tags',
                component: TagListComponent,
            },
            {
                path: 'tag/edit/:id',
                component: EditTagComponent,
                resolve: {tag: EditTagResolver}
            },
            {
                path: 'tag/create',
                component: EditTagComponent,
            },
            {
                path: 'web-feeds',
                component: WebFeedListComponent,
            },
            {
                path: 'web-feed/edit/:id',
                component: EditWebFeedComponent,
                resolve: {webFeed: EditWebFeedResolver}
            },
            {
                path: 'web-feed/create',
                component: EditWebFeedComponent,
            }
        ]
    }
];

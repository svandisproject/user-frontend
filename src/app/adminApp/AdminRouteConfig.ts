import {Route} from '@angular/router';
import {AdminComponent} from './AdminComponent';
import {PostListComponent} from './posts/PostListComponent';
import {AuthGuard} from '../common/guards/AuthGuard';
import {EditPostComponent} from './posts/edit/EditPostComponent';
import {EditPostResolver} from './posts/edit/EditPostResolver';

export const AdminRouteConfigs: Route[] = [
    {
        path: 'admin',
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
            }
        ]
    }
];

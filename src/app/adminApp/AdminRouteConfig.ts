import {Route} from '@angular/router';
import {AdminComponent} from './AdminComponent';
import {PostListComponent} from './posts/PostListComponent';
import {AuthGuard} from '../common/guards/AuthGuard';

export const AdminRouteConfigs: Route[] = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'posts', component: PostListComponent}
        ]
    }
];

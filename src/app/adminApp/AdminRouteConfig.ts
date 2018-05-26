import {Route} from '@angular/router';
import {AdminComponent} from './AdminComponent';
import {PostListComponent} from './posts/PostListComponent';

export const AdminRouteConfigs: Route[] = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {path: 'posts', component: PostListComponent}
        ]
    }
];

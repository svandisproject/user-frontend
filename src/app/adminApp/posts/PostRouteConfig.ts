import {Route} from '@angular/router';
import {PostListComponent} from './PostListComponent';
import {EditPostComponent} from './edit/EditPostComponent';
import {EditPostResolver} from './edit/EditPostResolver';

export const PostRouteConfig: Route[] = [
    {
        path: '',
        component: PostListComponent,
    },
    {
        path: 'edit/:id',
        component: EditPostComponent,
        resolve: {post: EditPostResolver}
    },
    {
        path: 'create',
        component: EditPostComponent,
    }
];
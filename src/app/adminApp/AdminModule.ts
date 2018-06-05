import {NgModule} from '@angular/core';
import {AdminNavComponent} from './adminNav/AdminNavComponent';
import {
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './dataTable/DataTableComponent';
import {PostListComponent} from './posts/PostListComponent';
import {AdminComponent} from './AdminComponent';
import {RouterModule} from '@angular/router';
import {AdminRouteConfigs} from './AdminRouteConfig';
import {EditPostComponent} from './posts/edit/EditPostComponent';
import {AppCommonModule} from '../common/AppCommonModule';
import {EditPostResolver} from './posts/edit/EditPostResolver';
import {TagListComponent} from './tags/TagListComponent';
import {EditWebFeedComponent} from './webFeed/edit/EditWebFeedComponent';
import {EditWebFeedResolver} from './webFeed/edit/EditWebFeedResolver';
import {WebFeedListComponent} from './webFeed/WebFeedListComponent';
import {EditTagComponent} from './tags/edit/EditTagComponent';
import {EditTagResolver} from './tags/edit/EditTagResolver';

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        MatSidenavModule,
        MatCardModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatGridListModule,
        MatSortModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        MatListModule,
        RouterModule.forChild(AdminRouteConfigs)
    ],
    declarations: [
        AdminComponent,
        DataTableComponent,
        PostListComponent,
        EditPostComponent,
        WebFeedListComponent,
        EditWebFeedComponent,
        TagListComponent,
        EditTagComponent,
        AdminNavComponent
    ],
    providers: [
        EditTagResolver,
        EditWebFeedResolver,
        EditPostResolver
    ],
    exports: [
        DataTableComponent,
        MatSidenavModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatIconModule,
        MatGridListModule,
        MatCardModule,
        MatSortModule,
        MatButtonModule,
        MatTableModule,
        AdminNavComponent
    ]
})
export class AdminModule {

}
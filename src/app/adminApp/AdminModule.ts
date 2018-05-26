import {NgModule} from '@angular/core';
import {AdminNavComponent} from './adminNav/AdminNavComponent';
import {MatListModule, MatPaginatorModule, MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './dataTable/DataTableComponent';
import {PostListComponent} from './posts/PostListComponent';
import {AdminComponent} from './AdminComponent';
import {RouterModule} from '@angular/router';
import {AdminRouteConfigs} from './AdminRouteConfig';

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        TranslateModule,
        MatListModule,
        RouterModule.forChild(AdminRouteConfigs)
    ],
    declarations: [
        AdminComponent,
        DataTableComponent,
        PostListComponent,
        AdminNavComponent
    ],
    exports: [
        DataTableComponent,
        MatSidenavModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatTableModule,
        AdminNavComponent
    ]
})
export class AdminModule {

}
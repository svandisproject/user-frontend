import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonMaterialModule} from '../../common/material/CommonMaterialModule';
import {PostListComponent} from './PostListComponent';
import {EditPostComponent} from './edit/EditPostComponent';
import {RouterModule} from '@angular/router';
import {PostRouteConfig} from './PostRouteConfig';
import {FormsModule} from '@angular/forms';
import {AppCommonModule} from '../../common/AppCommonModule';
import {DataTableModule} from '../../common/dataTable/DataTableModule';
import {CreateTagDialogComponent} from './edit/dialogs/CreateTagDialogComponent';

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(PostRouteConfig),
        DataTableModule,
        CommonMaterialModule
    ],
    exports: [],
    declarations: [
        PostListComponent,
        EditPostComponent,
        CreateTagDialogComponent,
    ],
    entryComponents: [
        CreateTagDialogComponent,
    ],
    providers: [],
})
export class PostsModule {
}

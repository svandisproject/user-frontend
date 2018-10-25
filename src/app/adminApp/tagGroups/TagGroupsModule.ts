import {NgModule} from '@angular/core';
import {TagGroupListComponent} from './list/TagGroupListComponent';
import {AppCommonModule} from '../../common/AppCommonModule';
import {CommonModule} from '@angular/common';
import {CommonMaterialModule} from '../../common/material/CommonMaterialModule';
import {RouterModule} from '@angular/router';
import {TagGroupsRouteConfig} from './TagGroupsRouteConfig';
import {FormsModule} from '@angular/forms';
import {CreateTagGroupDialogComponent} from './dialogs/CreateTagGroupDialogComponent';
import {TagInputModule} from '../tags/tagInput/TagInputModule';


@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        CommonMaterialModule,
        TagInputModule,
        FormsModule,
        RouterModule.forChild(TagGroupsRouteConfig)
    ],
    exports: [],
    declarations: [
        CreateTagGroupDialogComponent,
        TagGroupListComponent
    ],
    entryComponents: [
        CreateTagGroupDialogComponent
    ],
    providers: [],
})
export class TagGroupsModule {
}

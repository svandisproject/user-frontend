import {NgModule} from '@angular/core';
import {TagInputComponent} from './TagInputComponent';
import {CommonMaterialModule} from '../../../common/material/CommonMaterialModule';
import {CommonModule} from '@angular/common';
import {AppCommonModule} from '../../../common/AppCommonModule';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        CommonMaterialModule
    ],
    exports: [TagInputComponent],
    declarations: [TagInputComponent],
    providers: [],
})
export class TagInputModule {
}

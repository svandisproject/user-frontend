import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {DataTableComponent} from './DataTableComponent';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CommonMaterialModule} from '../material/CommonMaterialModule';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CommonMaterialModule,
    ],
    exports: [
        DataTableComponent
    ],
    declarations: [
        DataTableComponent
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DataTableModule {
}

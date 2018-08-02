import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {DataTableComponent} from './DataTableComponent';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSortModule,
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

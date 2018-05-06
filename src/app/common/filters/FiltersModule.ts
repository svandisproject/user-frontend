import {NgModule} from '@angular/core';
import {SearchFilterService} from './SearchFilterService';
import {FilterTableComponent} from './filter-table/FilterTableComponent';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {IcoFilterService} from './IcoFilterService';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    providers: [
        SearchFilterService,
        IcoFilterService
    ],
    declarations: [
        FilterTableComponent
    ],
    exports: [
        FilterTableComponent
    ]
})
export class FiltersModule {

}

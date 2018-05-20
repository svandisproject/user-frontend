import {NgModule} from '@angular/core';
import {LoginPageComponent} from './pages/login/LoginPageComponent';
import {TranslateModule} from '@ngx-translate/core';
import {ListReversePipe} from './pipes/ListReversePipe';
import {TruncatePipe} from './pipes/TruncatePipe';
import {FormsModule} from '@angular/forms';
import {SearchFormComponent} from './forms/search/SearchFormComponent';
import {RangeSliderComponent} from './forms/rangeSlider/RangeSliderComponent';
import {SvandisApiModule} from './api/SvandisApiModule';
import {FiltersModule} from './filters/FiltersModule';
import {DataTableComponent} from './dataTable/DataTableComponent';
import {CommonModule} from '@angular/common';
import {FilterButtonComponent} from './filters/filterButton/FilterButtonComponent';
import {OrderModule} from 'ngx-order-pipe';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SvandisApiModule,
        OrderModule,
        FiltersModule,
        BrowserAnimationsModule,
        TagInputModule,
        TranslateModule
    ],
    declarations: [
        ListReversePipe,
        RangeSliderComponent,
        DataTableComponent,
        FilterButtonComponent,
        TruncatePipe,
        SearchFormComponent,
        LoginPageComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        FormsModule,
        SvandisApiModule,
        FilterButtonComponent,
        DataTableComponent,
        FiltersModule,
        LoginPageComponent,
        RangeSliderComponent,
        SearchFormComponent,
        TruncatePipe,
        ListReversePipe
    ]
})
export class AppCommonModule {
}

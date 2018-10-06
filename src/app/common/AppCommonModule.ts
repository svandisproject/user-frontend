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
import {CommonModule} from '@angular/common';
import {FilterButtonComponent} from './filters/filterButton/FilterButtonComponent';
import {OrderModule} from 'ngx-order-pipe';
import {TagInputModule} from 'ngx-chips';
import {NgFormsModule} from './ngForms/NgFormsModule';
import {ToggleInputComponent} from './forms/toggle/ToggleInputComponent';
import {BlockUIModule} from 'ng-block-ui';
import {DataTableModule} from './dataTable/DataTableModule';
import {CommonMaterialModule} from './material/CommonMaterialModule';
import {CreateButtonComponent} from './buttons/CreateButtonComponent';
import {SaveButtonComponent} from './buttons/SaveButtonComponent';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SvandisApiModule,
        OrderModule,
        FiltersModule,
        NgFormsModule,
        TagInputModule,
        BlockUIModule,
        CommonMaterialModule,
        DataTableModule,
        TranslateModule
    ],
    declarations: [
        ListReversePipe,
        RangeSliderComponent,
        FilterButtonComponent,
        CreateButtonComponent,
        SaveButtonComponent,
        ToggleInputComponent,
        TruncatePipe,
        SearchFormComponent,
        LoginPageComponent
    ],
    exports: [
        NgFormsModule,
        CommonModule,
        FormsModule,
        CreateButtonComponent,
        SaveButtonComponent,
        OrderModule,
        FormsModule,
        DataTableModule,
        SvandisApiModule,
        FilterButtonComponent,
        FiltersModule,
        LoginPageComponent,
        ToggleInputComponent,
        RangeSliderComponent,
        SearchFormComponent,
        TruncatePipe,
        ListReversePipe
    ]
})
export class AppCommonModule {
}

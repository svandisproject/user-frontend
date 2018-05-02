import {NgModule} from '@angular/core';
import {LoginPageComponent} from './pages/login/LoginPageComponent';
import {TranslateModule} from '@ngx-translate/core';
import {ListReversePipe} from './pipes/ListReversePipe';
import {TruncatePipe} from './pipes/TruncatePipe';
import {FormsModule} from '@angular/forms';
import {SearchFormComponent} from './forms/search/SearchFormComponent';


@NgModule({
    imports: [
        FormsModule,
        TranslateModule
    ],
    declarations: [
        ListReversePipe,
        TruncatePipe,
        SearchFormComponent,
        LoginPageComponent
    ],
    exports: [
        FormsModule,
        LoginPageComponent,
        SearchFormComponent,
        TruncatePipe,
        ListReversePipe
    ]
})
export class AppCommonModule {
}

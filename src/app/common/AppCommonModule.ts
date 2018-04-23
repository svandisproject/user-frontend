import {NgModule} from '@angular/core';
import {LoginPageComponent} from './pages/login/LoginPageComponent';
import {TranslateModule} from '@ngx-translate/core';
import {ListReversePipe} from './pipes/ListReversePipe';
import {TruncatePipe} from './pipes/TruncatePipe';


@NgModule({
    imports: [TranslateModule],
    declarations: [
        ListReversePipe,
        TruncatePipe,
        LoginPageComponent
    ],
    exports: [
        LoginPageComponent,
        TruncatePipe,
        ListReversePipe
    ]
})
export class AppCommonModule {
}

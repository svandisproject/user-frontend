import {NgModule} from '@angular/core';
import {ConfirmationDialogComponent} from './confirmation/ConfirmationDialogComponent';
import {MatButtonModule, MatDialogModule} from '@angular/material';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        ConfirmationDialogComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ],
    declarations: [
        ConfirmationDialogComponent
    ],
    providers: [],
})
export class DialogModule {
}

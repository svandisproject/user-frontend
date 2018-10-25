import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        MatListModule,
        MatSelectModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatProgressBarModule,
        MatMenuModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatChipsModule,
        MatInputModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatBadgeModule,
        MatSidenavModule,


    ],
    exports: [
        MatListModule,
        MatBadgeModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatMenuModule,
        MatProgressBarModule,
        MatChipsModule,
        MatTooltipModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatSidenavModule,
    ],
    providers: [],
})
export class CommonMaterialModule {
}

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as _ from 'lodash';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'confirmationDialog.html',
    styleUrls: ['confirmationDialog.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ConfirmationDialogComponent implements OnInit {
    public message: string;

    constructor(public dialogRef: MatDialogRef<any>,
                @Inject(MAT_DIALOG_DATA) private data: { message: string }) {
    }

    ngOnInit() {
        this.message = _.get(this, 'data.message') || 'This action can not be reverted, are you sure you want confirm ';
    }

    public cancel(): void {
        this.dialogRef.close(false);
    }
}

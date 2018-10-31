import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {TagGroup} from '../../../../common/api/dataModels/TagGroup';
import {TagService} from '../../../../common/api/services/TagService';
import {Tag} from '../../../../common/api/dataModels/Tag';
import {finalize} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
    selector: 'app-admin-post-create-tag',
    templateUrl: 'createTagDialog.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['createTagDialog.scss']
})

export class CreateTagDialogComponent implements OnInit {
    public model: Tag;
    public isLoading = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { group: TagGroup },
                private dialogRef: MatDialogRef<CreateTagDialogComponent>,
                private snack: MatSnackBar,
                private tagService: TagService) {
    }

    ngOnInit() {
        this.model = {
            title: '',
        };
    }

    public createTag() {
        this.isLoading = true;
        this.tagService.saveOrCreate(this.model)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(
                (tag) => this.dialogRef.close(tag),
                (err) => {
                    _.forEach(err.error.children, (e, key) => {
                        if (e.errors) {
                            const firstError = _.head(e.errors);
                            this.snack.open('Error: ' + key + ' - ' + firstError);
                        }
                    });
                }
            );
    }
}
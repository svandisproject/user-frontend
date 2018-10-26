import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Tag} from '../../../common/api/dataModels/Tag';
import {TagService} from '../../../common/api/services/TagService';
import * as _ from 'lodash';
import {finalize} from 'rxjs/operators';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../common/dialogs/confirmation/ConfirmationDialogComponent';

@Component({
    selector: 'app-edit-tag',
    templateUrl: './editTag.html',
    styleUrls: ['./editTag.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EditTagComponent implements OnInit {
    public model: Tag;
    public isNew = false;
    public title: string;
    public isLoading = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private snack: MatSnackBar,
                private matDialog: MatDialog,
                private tagService: TagService) {
    }

    ngOnInit(): void {
        this.model = this.route.snapshot.data.tag || {title: ''};
        this.isNew = !this.route.snapshot.data.tag;
        this.title = _.clone(this.model.title);
    }

    public saveTag() {
        this.isLoading = true;
        const id: string = _.get(this.model, 'id');
        this.tagService.saveOrCreate(_.omit(this.model, 'id') as Tag, id)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(() => {
                this.router.navigate(['../../'], {relativeTo: this.route})
                    .then(() => this.snack.open('Tag updated'));
            });
    }

    public deleteTag() {
        const ref = this.matDialog.open(ConfirmationDialogComponent);
        ref.afterClosed().subscribe((confirmation) => {
            if (confirmation) {
                this.isLoading = true;
                const id: string = _.get(this.model, 'id');

                this.tagService.delete(id)
                    .pipe(finalize(() => this.isLoading = false))
                    .subscribe(() => {
                        this.router.navigate(['../../'], {relativeTo: this.route})
                            .then(() => this.snack.open('Tag Deleted'));
                    });
            }
        });

    }
}
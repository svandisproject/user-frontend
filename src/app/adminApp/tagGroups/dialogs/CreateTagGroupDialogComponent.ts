import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectionListChange} from '@angular/material';
import {EditTagGroup, TagGroup} from '../../../common/api/dataModels/TagGroup';
import {TagService} from '../../../common/api/services/TagService';
import {BehaviorSubject, Observable} from 'rxjs';
import {Tag} from '../../../common/api/dataModels/Tag';
import * as _ from 'lodash';

@Component({
    selector: 'app-tag-group-create',
    templateUrl: 'createTagGroupDialog.html',
    styleUrls: ['createTagGroupDialog.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CreateTagGroupDialogComponent implements OnInit {
    public model: EditTagGroup | TagGroup;
    public updatedModel: EditTagGroup;
    public isNew = true;

    private tagSubject = new BehaviorSubject(null);

    constructor(@Inject(MAT_DIALOG_DATA) public data: { group: TagGroup },
                private dialogRef: MatDialogRef<CreateTagGroupDialogComponent>,
                private tagService: TagService) {
    }

    ngOnInit() {
        if (this.data) {
            this.model = this.data.group;
            this.isNew = false;
        } else {
            this.model = this.createGroup();
        }

        this.tagService.findAll().subscribe((res) => this.tagSubject.next(res.content));
    }

    public getTags(): Observable<Tag[]> {
        return this.tagSubject.asObservable();
    }

    public isTagSelected(tag: Tag) {
        return _.find(this.model.tags, (t: Tag) => t.id === tag.id);
    }

    public selectTags(event: MatSelectionListChange) {
        const tagIds: number[] = _.map(event.source.selectedOptions.selected, (option) => option.value);
        this.updatedModel = _.cloneDeep(this.model) as EditTagGroup;
        this.updatedModel.tags = tagIds;
    }

    public submit() {
        this.dialogRef.close(this.updatedModel);
    }

    private createGroup(): EditTagGroup {
        return {
            title: '',
            enabled: true,
            tags: []
        };
    }
}
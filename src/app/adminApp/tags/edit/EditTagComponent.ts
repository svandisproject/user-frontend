import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EditTagModel} from '../models/EditTagModel';
import {BaseInput} from '../../../common/ngForms/inputs/base/BaseInput';
import {FormGroup} from '@angular/forms';
import {Tag} from '../../../common/api/dataModels/Tag';
import {TagService} from '../../../common/api/services/TagService';
import * as _ from 'lodash';

@Component({
    selector: 'app-edit-tag',
    templateUrl: './editTag.html',
    styleUrls: ['./editTag.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EditTagComponent {
    public tagModel: EditTagModel;

    private tag: Tag;
    private formFields: BaseInput[] = [];

    constructor(private route: ActivatedRoute,
                private tagService: TagService) {
        this.init();
    }

    public getInputs(): BaseInput[] {
        return this.formFields;
    }

    public onSave(formGroup: FormGroup) {
        this.tagModel = formGroup.value;
        this.saveTag();
    }

    private init() {
        this.tag = this.route.snapshot.data.tag;
        this.tagModel = new EditTagModel(this.tag);
        this.formFields = this.tagModel.getFormFields();
    }

    private saveTag() {
        const id: string = _.get(this.tag, 'id');

        this.tagService.saveOrCreate(this.tagModel, id).subscribe(() => {
            // TODO: do some indication or go back to list
        });
    }
}
import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseInput} from '../../../common/ngForms/inputs/base/BaseInput';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {EditWebFeedModel} from '../models/EditWebFeedModel';
import {WebFeedService} from '../../../common/api/services/WebFeedService';
import {WebFeed} from '../../../common/api/dataModels/WebFeed';

@Component({
    selector: 'app-edit-web-feed',
    templateUrl: './editWebFeed.html',
    styleUrls: ['./editWebFeed.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EditWebFeedComponent {
    public webFeedModel: EditWebFeedModel;

    private webFeed: WebFeed;
    private formFields: BaseInput[] = [];

    constructor(private route: ActivatedRoute,
                private webFeedService: WebFeedService) {
        this.init();
    }

    public getInputs(): BaseInput[] {
        return this.formFields;
    }

    public onSave(formGroup: FormGroup) {
        this.webFeedModel = formGroup.value;
        this.saveWebFeed();
    }

    private init() {
        this.webFeed = this.route.snapshot.data.webFeed;
        this.webFeedModel = new EditWebFeedModel(this.webFeed);
        this.formFields = this.webFeedModel.getFormFields();
    }

    private saveWebFeed() {
        const id: string = _.get(this.webFeed, 'id');

        this.webFeedService.saveOrCreate(this.webFeedModel, id).subscribe(() => {
            // TODO: do some indication or go back to list
        });
    }
}
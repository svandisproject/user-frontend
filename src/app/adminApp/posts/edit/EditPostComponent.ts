import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../common/api/services/PostService';
import {EditPostModel} from '../models/EditPostModel';
import {Post} from '../../../common/api/dataModels/Post';
import {BaseInput} from '../../../common/ngForms/inputs/base/BaseInput';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'app-edit-post',
    templateUrl: './editPost.html',
    styleUrls: ['./editPost.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EditPostComponent {
    public postModel: EditPostModel;

    private post: Post;
    private formFields: BaseInput[] = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private postService: PostService) {
        this.init();
    }

    public getInputs(): BaseInput[] {
        return this.formFields;
    }

    public onSave(formGroup: FormGroup) {
        this.postModel = formGroup.value;
        this.savePost();
    }

    private init() {
        this.post = this.route.snapshot.data.post;
        this.postModel = new EditPostModel(this.post);
        this.formFields = this.postModel.getFormFields();
    }

    private savePost() {
        const id: string = _.get(this.post, 'id');

        this.postModel.published_at = this.post ? this.post.published_at : new Date();
        this.postService.saveOrCreate(this.postModel, id).subscribe(() => {
            this.router.navigate(['../../'], {relativeTo: this.route});
        });
    }
}
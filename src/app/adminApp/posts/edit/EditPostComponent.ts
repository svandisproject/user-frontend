import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../common/api/services/PostService';
import {EditPostModel} from '../models/EditPostModel';
import {Post} from '../../../common/api/dataModels/Post';
import {BaseInput} from '../../../common/ngForms/inputs/base/BaseInput';
import {FormGroup} from '@angular/forms';

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
        this.postModel.id = this.post.id;
        this.postService.saveOrCreate(this.postModel).subscribe(() => {
            // TODO: do some indication or go back to list
        });
    }
}
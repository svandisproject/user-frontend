import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../common/api/services/PostService';
import {EditPostModel} from '../models/EditPostModel';
import {Post} from '../../../common/api/dataModels/Post';
import {BaseInput} from '../../../common/ngForms/inputs/base/BaseInput';

@Component({
    selector: 'app-edit-post',
    templateUrl: './editPost.html'
})

export class EditPostComponent {
    public postModel: EditPostModel;

    private post: Post;
    private formFields: BaseInput[] = [];

    constructor(private route: ActivatedRoute,
                private postService: PostService) {
        this.post = this.route.snapshot.data.post;
        this.postModel = new EditPostModel(this.post);
        this.formFields = this.postModel.getFormFields();
    }

    public getInputs(): BaseInput[] {
        return this.formFields;
    }
}
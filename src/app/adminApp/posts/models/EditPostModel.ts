import {Post} from '../../../common/api/dataModels/Post';
import {Tag} from '../../../common/api/dataModels/Tag';
import {NgFormField} from '../../../common/ngForms/decorators/NgFormFieldDecorator';
import {FormFieldType} from '../../../common/ngForms/models/FormFieldType';
import {NgFormsModel} from '../../../common/ngForms/models/NgFormsModel';

export class EditPostModel extends NgFormsModel implements Post {

    id: string;

    @NgFormField({fieldType: FormFieldType.TEXT})
    title: string;

    @NgFormField({fieldType: FormFieldType.TEXT})
    url: string;

    @NgFormField({fieldType: FormFieldType.TEXT_AREA})
    content: string;

    @NgFormField({fieldType: FormFieldType.TEXT})
    source: string;

    tags: Tag[];

    constructor(post: Post) {
        super();
        this.title = post.title;
        this.content = post.content;
        this.source = post.source;
        this.tags = post.tags;
        this.url = post.url;
        this.id = post.id;
    }
}
import {Post} from '../../../common/api/dataModels/Post';
import {Tag} from '../../../common/api/dataModels/Tag';
import {NgFormField} from '../../../common/ngForms/decorators/NgFormFieldDecorator';
import {FormFieldType} from '../../../common/ngForms/models/FormFieldType';
import {NgFormsModel} from '../../../common/ngForms/models/NgFormsModel';

export class EditPostModel extends NgFormsModel implements Post {

    id: string;

    @NgFormField({fieldType: FormFieldType.TEXT, placeholder: 'Tile'})
    title = '';

    @NgFormField({fieldType: FormFieldType.TEXT, placeholder: 'Url'})
    url = '';

    @NgFormField({fieldType: FormFieldType.TEXT_AREA, placeholder: 'Content'})
    content = '';

    @NgFormField({fieldType: FormFieldType.TEXT, placeholder: 'Source'})
    source = '';

    @NgFormField({
        fieldType: FormFieldType.CHECKBOX,
        placeholder: 'Tags',
        selectOptionKeys: {labelKey: 'title', valueKey: 'id'}
    })
    tags: Tag[];

    published_at: Date = new Date();

    constructor(post: Post) {
        super();
        if (post) {
            this.title = post.title;
            this.content = post.content;
            this.source = post.source;
            this.tags = post.tags;
            this.published_at = post.published_at;
            this.url = post.url;
        }
    }
}
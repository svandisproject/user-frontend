import {Tag} from '../../../common/api/dataModels/Tag';
import {NgFormField} from '../../../common/ngForms/decorators/NgFormFieldDecorator';
import {FormFieldType} from '../../../common/ngForms/models/FormFieldType';
import {NgFormsModel} from '../../../common/ngForms/models/NgFormsModel';

export class EditTagModel extends NgFormsModel implements Tag {
    id: string;

    @NgFormField({fieldType: FormFieldType.TEXT, placeholder: 'Title'})
    title = '';

    constructor(tag: Tag) {
        super();
        if (tag) {
            this.title = tag.title;
        }
    }
}
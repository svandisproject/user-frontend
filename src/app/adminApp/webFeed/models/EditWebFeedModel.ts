import {NgFormsModel} from '../../../common/ngForms/models/NgFormsModel';
import {FormFieldType} from '../../../common/ngForms/models/FormFieldType';
import {NgFormField} from '../../../common/ngForms/decorators/NgFormFieldDecorator';
import {WebFeed} from '../../../common/api/dataModels/WebFeed';

export class EditWebFeedModel extends NgFormsModel implements WebFeed {
    id: string;

    @NgFormField({fieldType: FormFieldType.TEXT, placeholder: 'Tile'})
    title = '';

    @NgFormField({fieldType: FormFieldType.TEXT, placeholder: 'Url'})
    url = '';

    @NgFormField({fieldType: FormFieldType.TEXT, placeholder: 'Link selector'})
    link_selector = '';

    @NgFormField({fieldType: FormFieldType.TEXT, placeholder: 'Time interval'})
    time_interval = '';


    constructor(webFeed?: WebFeed) {
        super();

        if (webFeed) {
            this.id = webFeed.id;
            this.title = webFeed.title;
            this.url = webFeed.url;
            this.link_selector = webFeed.link_selector;
            this.time_interval = webFeed.time_interval;
        }
    }
}
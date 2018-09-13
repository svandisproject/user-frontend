import {BaseInput} from './BaseInput';
import {TextInput} from '../TextInput';
import {BaseInputParams} from './BaseInputParams';
import {TextAreaInput} from '../TextAreaInput';
import {SelectInput} from '../SelectInput';
import {CheckboxInput} from '../CheckboxInput';
import {RadioInput} from '../RadioInput';

export class BaseInputFactory {
    public static build(className: string,
                        fieldName: string,
                        params?: BaseInputParams): BaseInput {
        if (className === 'SelectInput' || className === 'RadioInput') {
            return new Inputs[className](fieldName, params.selectOptions, params);
        } else {
            return new Inputs[className](fieldName, params);
        }

    }
}

const Inputs = {
    TextInput,
    CheckboxInput,
    TextAreaInput,
    SelectInput,
    RadioInput
};
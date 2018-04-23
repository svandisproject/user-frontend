import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'listReverse'
})
export class ListReversePipe implements PipeTransform {

    transform(value) {
        if (!value) {
            return;
        }

        return value.reverse();
    }
}

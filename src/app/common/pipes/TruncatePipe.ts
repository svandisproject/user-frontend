import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

    transform(value: string, args: string[]): string {
        args = args || ['120', '...'];
        const limit = parseInt(args[0], 10);
        const trail = args[1];
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}

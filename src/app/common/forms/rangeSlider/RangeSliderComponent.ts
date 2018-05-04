import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-range-slider',
    styleUrls: ['./rangeSlider.scss'],
    templateUrl: './rangeSlider.html'
})
export class RangeSliderComponent {
    @Input() placeholder = 'Search...';
    @Input() ngModel: number;
    @Input() options = {
        min: 0,
        max: 10,
        step: 0.1
    };

    @Output() ngModelChange: EventEmitter<number> = new EventEmitter<number>();

    public increaseValue(): void {
        if (this.ngModel >= this.options.max) {
            return;
        }

        this.ngModel = this.ngModel + this.options.step;
        this.ngModelChange.emit(this.ngModel);
    }

    public decreaseValue(): void {
        if (this.ngModel <= this.options.min) {
            return;
        }

        this.ngModel = this.ngModel - this.options.step;
        this.ngModelChange.emit(this.ngModel);
    }
}

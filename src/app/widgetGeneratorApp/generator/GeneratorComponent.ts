import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GeneratorService} from '../services/GeneratorService';

@Component({
    selector: 'app-widget-generator',
    templateUrl: 'generator.html',
    styleUrls: ['./generator.scss']
})

export class GeneratorComponent implements OnInit, AfterViewChecked {
    public readonly language = 'html';
    public content = '';
    public tagGroups: Observable<any[]>;
    constructor(
        private generatorService: GeneratorService,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.content = this.generatorService.getTagContent();
        this.tagGroups = this.generatorService.getTags();
    }

    ngAfterViewChecked(): void {
        this._changeDetectionRef.detectChanges();
    }

    onChipSelect($e) {
        this.generatorService.selectTag($e);
    }
}
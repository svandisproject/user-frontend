import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GeneratorService} from '../services/GeneratorService';
import {Tag} from '../dataModels/Tag';

@Component({
    selector: 'app-widget-generator',
    templateUrl: 'generator.html',
    styleUrls: ['./generator.scss']
})

export class GeneratorComponent implements OnInit, AfterViewChecked {
    public readonly language = 'html';
    public content = '';
    public tags: Tag[] = [];
    constructor(
        private generatorService: GeneratorService,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.content = this.generatorService.getTagContent();
        this.generatorService.getTags().subscribe(v => this.afterGotTags(v));
    }

    ngAfterViewChecked(): void {
        this._changeDetectionRef.detectChanges();
    }

    afterGotTags(tags) {
        this.tags = tags.data;
    }

    onChipSelect($e) {
        this.generatorService.selectTag($e);
    }
}
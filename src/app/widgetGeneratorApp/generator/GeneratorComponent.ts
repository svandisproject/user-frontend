import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GeneratorService, TagGroup} from './services/generator.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-widget-generator',
    templateUrl: 'generator.html',
    styleUrls: ['./generator.scss']
})

export class GeneratorComponent implements OnInit, AfterViewChecked {
    public readonly language = 'html';
    public content = '<app-svandis-news [filters]="{{tags}}"></app-svandis-news>';
    public tagGroups: Observable<TagGroup[]>;
    constructor(
        private generatorService: GeneratorService,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
    }

    ngAfterViewChecked(): void {
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.tagGroups = this.generatorService.getTags();
    }

    getContent() {
        return this.generatorService.getContent();
    }

    onChipSelect($e) {
        this.generatorService.changeTags($e);
    }
}
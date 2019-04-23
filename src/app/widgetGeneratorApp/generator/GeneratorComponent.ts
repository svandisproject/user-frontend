import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {GeneratorService} from '../services/GeneratorService';
import {TagGroup} from '../dataModels/TagGroup';
import {UserTagsRes} from '../dataModels/UserTagsRes';
import {GetTagsRes} from '../dataModels/GetTagsRes';
import {SaveTagsRes} from '../dataModels/SaveTagsRes';
@Component({
    selector: 'app-widget-generator',
    templateUrl: 'generator.html',
    styleUrls: ['./generator.scss']
})

export class GeneratorComponent implements OnInit, AfterViewChecked {
    public readonly language = 'html';
    public tagGroups: TagGroup[];
    public token = '';
    public selectedTags: {[key: string]: boolean} = {};
    @ViewChild ('codeHighlight') codeHighlight;
    constructor(
        private generatorService: GeneratorService,
        private changeDetectionRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.generatorService.getAllTags().subscribe(v => this.afterGotTagsAll(v));
        this.generatorService.getUserTags().subscribe(v => this.afterGotUserTags(v));
    }


    getCodeContent(): string {
        return this.generatorService.getTagContent(this.token);
    }


    isTagSelected(tagId: number) {
        return this.selectedTags[tagId];
    }

    ngAfterViewChecked(): void {
        this.changeDetectionRef.detectChanges();
    }

    afterGotTagsAll(tags: GetTagsRes) {
        this.tagGroups = tags.data;
    }

    selectTag(tagId: number): void {
        this.selectedTags[tagId] = !this.selectedTags[tagId];
        this.generatorService.saveUserTags(this.selectedTags)
            .subscribe(this.afterSaveUserTags);

    }

    afterGotUserTags(res: UserTagsRes) {
        this.token = res.data.token;
        this.selectedTags =  {};
        res.data.tags.forEach(v => this.selectedTags[v.id] = true);
    }

    afterSaveUserTags(res: SaveTagsRes) {
        this.token = res.data.token;
        this.selectedTags =  {};
        res.data.tags.forEach(v => this.selectedTags[v.id] = true);
    }
}
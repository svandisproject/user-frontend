import {Component, OnInit, ViewChild} from '@angular/core';
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

export class GeneratorComponent implements OnInit {
    public readonly language = 'html';
    public tagGroups: TagGroup[];
    public token = '';
    public content = '';
    public selectedTags: { [key: string]: boolean } = {};
    @ViewChild ('codeHighlight') codeHighlight;
    constructor(
        private generatorService: GeneratorService
    ) {}

    ngOnInit() {
        this.generatorService.getAllTags().subscribe(v => this.afterGotTagsAll(v));
        this.generatorService.getUserTags().subscribe(v => this.afterGotUserTags(v));
    }

    getCodeContent(): string {
        this.content = this.generatorService.getTagContent(this.token);
        return this.content;
    }

    isTagSelected(tagId: number): boolean {
        return this.selectedTags[tagId];
    }

    afterGotTagsAll(tags: GetTagsRes): void {
        this.tagGroups = tags.data;
    }

    selectTag(tagId: number): void {
        this.selectedTags[tagId] = !this.selectedTags[tagId];
        this.generatorService.saveUserTags(this.selectedTags)
            .subscribe(this.afterSaveUserTags);

    }

    afterGotUserTags(res: UserTagsRes): void {
        this.token = res.data.token;
        this.selectedTags =  {};
        res.data.tags.forEach(v => this.selectedTags[v.id] = true);
    }

    afterSaveUserTags(res: SaveTagsRes): void {
        this.token = res.data.token;
        this.selectedTags =  {};
        res.data.tags.forEach(v => this.selectedTags[v.id] = true);
    }
}
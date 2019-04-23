import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneratorService} from '../services/GeneratorService';
import {TagGroup} from '../dataModels/TagGroup';
import {UserTagsRes} from '../dataModels/UserTagsRes';
import {SaveTagsRes} from '../dataModels/SaveTagsRes';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
@Component({
    selector: 'app-widget-generator',
    templateUrl: 'generator.html',
    styleUrls: ['./generator.scss']
})

export class GeneratorComponent implements OnInit {
    public readonly language = 'html';
    public tagGroupsStream: Observable<TagGroup[]>;
    public token = '';
    public content = '';
    public selectedTags: { [key: string]: boolean } = {};
    @ViewChild ('codeHighlight') codeHighlight;
    constructor (private generatorService: GeneratorService) {
    }

    ngOnInit() {
        this.tagGroupsStream = this.generatorService.getAllTags();
        this.generatorService.getUserTags().subscribe(v => this.afterGotUserTags(v));
    }

    public getCodeContent(): string {
        this.content = this.generatorService.getTagContent(this.token);
        return this.content;
    }

    public isTagSelected(tagId: number): boolean {
        return _.get(this.selectedTags, tagId);
    }

    public selectTag(tagId: number): void {
        const newVal = !(_.get(this.selectedTags, tagId));
        _.set(this.selectedTags, tagId + '', newVal);
        this.generatorService.saveUserTags(this.selectedTags)
            .subscribe(this.afterSaveUserTags);

    }

    public afterGotUserTags(res: UserTagsRes): void {
        this.token = res.token;
        this.selectedTags = {};
        _(res.tags).forEach(v =>  _.set(this.selectedTags, v.id + '', true));
    }

    public afterSaveUserTags(res: SaveTagsRes): void {
        this.token = res.token;
        this.selectedTags = {};
        _(res.tags).forEach(v => _.set(this.selectedTags, v.id + '', true));
    }
}
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../../common/api/dataModels/Tag';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import * as _ from 'lodash';
import {finalize, map} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {TagService} from '../../../common/api/services/TagService';

@Component({
    selector: 'app-admin-tag-input',
    templateUrl: 'tagInput.html'
})

export class TagInputComponent implements OnInit {
    @Input() tags: Tag[];
    @Output() tagsChange: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

    public isLoading = false;
    public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    private existingTagsSubject = new BehaviorSubject(null);

    constructor(private tagService: TagService) {
    }

    ngOnInit() {
        this.tagService.findAll()
            .pipe(map((pageable) => pageable.content))
            .subscribe((tags) => {
                this.existingTagsSubject.next(tags);
            });
    }

    public addTag(event) {
        const value = event.value as string;
        if (value) {
            const existing = this.existingTagsSubject.getValue();
            const tag: Tag = _.find(existing, (t) => t.title === value) || {title: value};
            if (!tag.id) {
                this.isLoading = true;
                this.tagService.saveOrCreate(tag)
                    .pipe(finalize(() => this.isLoading = false))
                    .subscribe((t) => {
                        this.pushTag(t);
                        event.input.value = '';
                    });
            } else {
                this.pushTag(tag);
                event.input.value = '';
            }
        }
    }

    public getExistingTags(): Observable<Tag[]> {
        return this.existingTagsSubject.asObservable();
    }

    public selectTag(event: MatAutocompleteSelectedEvent) {
        this.tags.push(event.option.value);
        this.onChange();
    }

    public removeTag(tag: Tag) {
        _.remove(this.tags, (t) => t.id === tag.id);
        this.onChange();
    }

    private pushTag(t) {
        this.tags.push(t);
        this.onChange();
    }

    private onChange() {
        this.tagsChange.emit(this.tags);
    }
}
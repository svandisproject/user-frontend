import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../common/api/services/PostService';
import {Post} from '../../../common/api/dataModels/Post';
import * as _ from 'lodash';
import {finalize, map} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Tag} from '../../../common/api/dataModels/Tag';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {TagService} from '../../../common/api/services/TagService';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-edit-post',
    templateUrl: './editPost.html',
    styleUrls: ['./editPost.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EditPostComponent implements OnInit {
    public postModel: Post;
    public hasChange = false;
    public isLoading = false;
    public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    private existingTagsSubject = new BehaviorSubject(null);
    private post: Post;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private tagService: TagService,
                private postService: PostService) {
    }

    ngOnInit() {
        this.post = this.route.snapshot.data.post;
        this.postModel = _.cloneDeep(this.post);

        this.tagService.findAll()
            .pipe(map((pageable) => pageable.content))
            .subscribe((tags) => {
                this.existingTagsSubject.next(tags);
            });
    }

    public onSave() {
        this.savePost();
    }

    public onChange() {
        this.hasChange = true;
    }

    public getExistingTags(): Observable<Tag[]> {
        return this.existingTagsSubject.asObservable();
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

    public selectTag(event: MatAutocompleteSelectedEvent) {
        this.postModel.tags.push(event.option.value);
        this.onChange();
    }

    public removeTag(tag: Tag) {
        _.remove(this.postModel.tags, (t) => t.id === tag.id);
        this.onChange();
    }

    private pushTag(t) {
        this.postModel.tags.push(t);
        this.onChange();
    }

    private savePost() {
        const id: string = _.get(this.post, 'id');
        this.isLoading = true;
        this.postModel.published_at = this.post ? this.post.published_at : new Date();
        this.postService.saveOrCreate(this.postModel, id)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(() => {
                this.hasChange = false;
            });
    }
}
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../common/api/services/PostService';
import {Post} from '../../../common/api/dataModels/Post';
import * as _ from 'lodash';
import {debounce, finalize, map, startWith, switchMap} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Tag} from '../../../common/api/dataModels/Tag';
import {MatAutocompleteSelectedEvent, MatDialog, MatSelectChange} from '@angular/material';
import {TagService} from '../../../common/api/services/TagService';
import {BehaviorSubject, interval, Observable} from 'rxjs';
import {TagGroupService} from '../../../common/api/services/TagGroupService';
import {TagGroup} from '../../../common/api/dataModels/TagGroup';
import {Filter} from '../../../common/api/dataModels/Filter';
import {FormControl} from '@angular/forms';
import {ConfirmationDialogComponent} from '../../../common/dialogs/confirmation/ConfirmationDialogComponent';
import {CreateTagDialogComponent} from './dialogs/CreateTagDialogComponent';

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

    public selectedGroup: TagGroup;
    public recentTags: Tag[];
    public tagSearchControl = new FormControl();
    public filteredTags: Observable<Tag[]> = new BehaviorSubject(null).asObservable();
    public isSearching = false;

    private post: Post;
    private tagGroupsSubject = new BehaviorSubject<TagGroup[]>(null);

    constructor(private route: ActivatedRoute,
                private router: Router,
                private tagService: TagService,
                private matDialog: MatDialog,
                private tagGroupService: TagGroupService,
                private postService: PostService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.prepareModel();
        this.prepareTags();

        this.tagGroupService.findAllEnabled()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((res) => this.tagGroupsSubject.next(res.content));
    }


    public getGroups(): Observable<TagGroup[]> {
        return this.tagGroupsSubject.asObservable();
    }

    public onSave() {
        this.savePost();
    }

    public onChange() {
        this.hasChange = true;
    }

    public addNewTag() {
        const ref = this.matDialog.open(CreateTagDialogComponent);
        ref.afterClosed().subscribe((tag: Tag) => {
            if (tag) {
                this.addExistingTag(tag);
            }
        });
    }

    public deletePost() {
        const ref = this.matDialog.open(ConfirmationDialogComponent);
        ref.afterClosed().subscribe((confirmed) => {
            if (confirmed) {
                this.postService.deletePost(this.postModel);
            }
        });
    }

    public onGroupSelect(event: MatSelectChange) {
        if (event.value === 'all') {
            this.selectedGroup = null;
        } else {
            this.selectedGroup = event.value;
        }
        this.loadTags();
    }

    public addExistingTag(tag: Tag) {
        this.pushTag(tag);
        this.recentTags = this.tagService.addTagToRecent(tag);
        this.tagSearchControl.setValue('');
        this.tagSearchControl.reset();
    }

    public selectTag(event: MatAutocompleteSelectedEvent) {
        this.postModel.tags.push(event.option.value);
        this.recentTags = this.tagService.addTagToRecent(event.option.value);
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

    private prepareTags() {
        this.filteredTags = this.getFilteredTags();
        this.recentTags = this.tagService.getRecentTags();
    }

    private prepareModel() {
        this.post = this.route.snapshot.data.post;
        this.postModel = _.cloneDeep(this.post);
    }

    private getFilteredTags() {
        return this.tagSearchControl.valueChanges
            .pipe(
                startWith(''),
                debounce(() => interval(500)),
                switchMap((value) => {
                    this.isSearching = true;

                    const filters = [
                        new Filter('lk', 'title', value)
                    ];

                    if (this.selectedGroup) {
                        filters.push(new Filter('eq', 'group.id', String(this.selectedGroup.id)));
                    }

                    return this.tagService.findBy(filters)
                        .pipe(finalize(() => this.isSearching = false));
                }),
                map((pageable) => pageable.content),
            );
    }

    private loadTags() {
        const filter = this.selectedGroup ?
            new Filter('eq', 'group.id', String(this.selectedGroup.id)) : null;
        if (filter) {
            this.isLoading = true;
            this.tagService.findBy([filter])
                .pipe(finalize(() => this.isLoading = false))
                .subscribe((tags) => {
                    this.tagSearchControl.reset();
                });
        }
    }

    private savePost() {
        const id: string = _.get(this.post, 'id');
        this.isLoading = true;
        this.postModel.published_at = this.post ? this.post.published_at : new Date();
        const model = _.omit(this.postModel, ['url', 'tags_added_by', 'published_at']);
        this.postService.saveOrCreate(model, id)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(() => {
                this.hasChange = false;
            });
    }
}
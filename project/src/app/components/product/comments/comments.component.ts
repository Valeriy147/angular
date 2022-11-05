import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/services/comments.service';
import { Select, Store } from '@ngxs/store';
import { GetComments, AddComment } from './../../../state/comments.actions';
import { CommentsState } from './../../../state/comments.state';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {

  form!: FormGroup
  formComplete!: boolean
  id!: Number;
  timeout$!: Observable<any>
  private sub: any;

  @Select(CommentsState.getComments) comments$!: Observable<Comment[]>
  @Select(CommentsState.getLoadedGet) loadedGet$!: Observable<boolean>
  @Select(CommentsState.getLoadingGet) loadingGet$!: Observable<boolean>
  @Select(CommentsState.getErrorAdd) errorAdd$!: Observable<boolean>
  @Select(CommentsState.getLoadedAdd) loadedAdd$!: Observable<boolean>

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        switchMap(params => (params ? this.getComments(params) : '')),
      )
      .subscribe()


    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      text: new FormControl('', [Validators.maxLength(1000)]),
      score: new FormControl('5', Validators.required),
    })
  }

  getComments(params: Params) {
    this.id = (+params['id'])
    return this.store.dispatch(new GetComments(+params['id']))
  }

  addComment(): void {
    if (this.form.valid) {
      const formData = { ...this.form.value }
      this.store.dispatch(new AddComment({ ...formData, parentId: this.id }))
      this.loadedAdd$.subscribe(result => result ? this.form.reset() : '')
      this.formComplete = true
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

import { CommentsService } from 'src/app/services/comments.service';
import { AddCommentSuccess, AddCommentFail, AddComment, GetComments, GetCommentsSuccess, GetCommentsFail } from './comments.actions';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';


export class CommentsStateModel {
  comments!: Comment[];
  loadingGet!: boolean;
  loadedGet!: boolean;
  loadingAdd!: boolean;
  loadedAdd!: boolean;
}

@State<CommentsStateModel>({
  name: 'comments',
  defaults: {
    comments: [],
    loadingGet!: false,
    loadedGet!: false,
    loadingAdd!: false,
    loadedAdd!: false
  }
})
@Injectable()
export class CommentsState {

  constructor(private commentsService: CommentsService) { }

  @Selector() static getComments(state: CommentsStateModel) {
    return state.comments;
  }

  @Selector() static getLoadedAdd(state: CommentsStateModel) {
    return !state.loadingAdd && state.loadedAdd
  }

  @Selector() static getErrorAdd(state: CommentsStateModel) {
    return !state.loadingAdd && !state.loadedAdd
  }

  @Selector() static getLoadedGet(state: CommentsStateModel) {
    return !state.loadingGet && state.loadedGet
  }

  @Selector() static getLoadingGet(state: CommentsStateModel) {
    return state.loadingGet && !state.loadedGet
  }


  @Action(GetComments)
  get(ctx: StateContext<CommentsStateModel>, { id }: GetComments) {
    ctx.patchState({
      loadingGet: true,
      loadedGet: false,
    });
    this.commentsService.getComments(id).subscribe(
      response => ctx.dispatch(new GetCommentsSuccess(response)),
      err => ctx.dispatch(new GetCommentsFail(err))
    )
  }

  @Action(GetCommentsSuccess)
  getCommentSuccess({ patchState, getState }: StateContext<CommentsStateModel>, { data }: GetCommentsSuccess) {
    const state = getState().comments
    patchState({
      loadingGet: false,
      loadedGet: true,
      comments: data
    })
  }

  @Action(GetCommentsFail)
  getCommentFail(ctx: StateContext<CommentsStateModel>, { err }: GetCommentsFail) {
    ctx.patchState({
      loadingGet: false,
      loadedGet: false,
    });
    console.warn(err)
  }

  @Action(AddComment)
  add(ctx: StateContext<CommentsStateModel>, { comment }: AddComment) {
    ctx.patchState({
      loadingAdd: true,
      loadedAdd: false,
    });
    this.commentsService.addComment(comment).subscribe(
      response => ctx.dispatch(new AddCommentSuccess(response)),
      error => ctx.dispatch(new AddCommentFail(error))
    )
  }

  @Action(AddCommentSuccess)
  addCommentSuccess({ patchState, getState }: StateContext<CommentsStateModel>, { data }: AddCommentSuccess) {
    const state = getState().comments
    patchState({
      loadingAdd: false,
      loadedAdd: true,
      comments: [...state, data]
    })
  }

  @Action(AddCommentFail)
  addCommentFail(ctx: StateContext<CommentsStateModel>, { err }: AddCommentFail) {
    ctx.patchState({
      loadingAdd: false,
      loadedAdd: false,
    });
    console.warn(err)
  }
}

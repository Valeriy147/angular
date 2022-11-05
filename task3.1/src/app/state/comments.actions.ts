import { Comment } from 'src/app/services/comments.service';

export class GetComments {
  static readonly type = '[Comments] Get'
  constructor(public id: Number) { }

}
export class GetCommentsSuccess {
  static readonly type = '[Comments] Get Success'
  constructor(public data: any) { }
}

export class GetCommentsFail {
  static readonly type = '[Comments] Get Fail'
  constructor(public err: any) { }
}

export class AddComment {
  static readonly type = '[Comments] Add'
  constructor(public comment: Comment) { }

}
export class AddCommentSuccess {
  static readonly type = '[Comments] Add Success'
  constructor(public data: any) { }
}

export class AddCommentFail {
  static readonly type = '[Comments] Add Fail'
  constructor(public err: any) { }
}

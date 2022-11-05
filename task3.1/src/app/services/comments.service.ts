import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from "@angular/common/http";

export interface Comment {
  id?: number
  name: string
  text?: string
  score: number
  email: string
  parentId: number
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) { }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>("http://localhost:3000/comments", { ...comment })
      .pipe(
        catchError(error => {
          console.warn("Send comment error :", error.message)
          return throwError(error)
        })
      )
  }

  getComments(id: Number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`http://localhost:3000/comments?parentId=${id}`)
      .pipe(
        catchError(error => {
          console.warn("Load comments error :", error.message)
          return throwError(error)
        })
      )
  }

}

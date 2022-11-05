import { GetSearchProduct } from './../state/categories.actions';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, catchError, throwError, take } from 'rxjs';
import { Comment } from 'src/app/services/comments.service';

export interface Painting {
  id: number
  img: any
  author: string
  name: string
  year: number
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getCategoryProducts(category: String): Observable<Painting[]> {
    return this.http.get<Painting[]>(`http://localhost:3000/products?type=${category}`)
      .pipe(
        catchError(error => {
          console.warn(`Load ${category} error :`, error.message)
          return throwError(error)
        })
      )
  }

  getCategories(): Observable<String[]> {
    return this.http.get<String[]>("http://localhost:3000/category")
      .pipe(
        catchError(error => {
          console.warn("Load category error :", error.message)
          return throwError(error)
        })
      )
  }

  getById(id: Number): Observable<Painting> {
    return this.http.get<Painting>(`http://localhost:3000/products/${id}`)
      .pipe(
        catchError(error => {
          console.warn("Load bestsellers error :", error.message)
          return throwError(error)
        })
      )
  }

  getSearchProduct(category: String, name: String): Observable<Painting[]> {
    let categ = category[0].toLowerCase() + category.slice(1).split(' ').join('')
    if (category === "All categories") {
      return this.http.get<Painting[]>(`http://localhost:3000/products?q=${name}`)
        .pipe(
          catchError(error => {
            return throwError(error)
          })
        )
    } else {
      return this.http.get<Painting[]>(`http://localhost:3000/products?q=${name}&&type=${categ}`)
        .pipe(
          catchError(error => {
            return throwError(error)
          })
        )
    }
  }

  getFilteredProducts(ratings: number[], authors: string[]): Observable<Painting[]> {
    let request = ''
    for (let i = 0; i < ratings.length; i++) {
      if (request.length === 0) {
        request = request + `rating=${ratings[i]}`
      } else { request = request + `&&rating=${ratings[i]}` }
    }
    for (let i = 0; i < authors.length; i++) {
      if (authors.length === 0) {
        request = request + `author=${authors[i]}`
      } else { request = request + `&&author=${authors[i]}` }
    }
    return this.http.get<Painting[]>(`http://localhost:3000/products?${request}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, catchError, throwError } from 'rxjs';
import { Painting } from './products.service';

export interface Order {
  additional: String,
  address: String,
  agreeToSending: Boolean,
  agreeWithPolicy: Boolean,
  billingMethod: String,
  firstName: String,
  lastName: String,
  number: String,
  paymentMethod: String,
  state: String,
  town: String,
  zip: String,
  diffAddress: Boolean
  products: Painting[]
}

@Injectable({
  providedIn: 'root'
})
export class BagService {
  private count: BehaviorSubject<number> = new BehaviorSubject(0);
  private products: Painting[] = [];

  constructor(private http: HttpClient) { }


  getBasketCount(): Observable<number> {
    return this.count.asObservable();
  }

  getProducts(): Observable<Painting[]> {
    return of(this.products)
  }

  setProduct(product: Painting): void {
    this.products.push(product);
  }

  add(): void {
    this.count.next(this.count.value + 1)
  }

  remove(): void {
    this.count.next(this.count.value - 1)
  }

  completeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>("http://localhost:3000/orders", { ...order })
      .pipe(
        catchError(error => {
          console.warn("Order complete error :", error.message)
          return throwError(error)
        })
      )
  }

}

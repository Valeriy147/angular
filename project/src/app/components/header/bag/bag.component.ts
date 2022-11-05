import { Order } from './../../../services/bag.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Select, Store } from '@ngxs/store';
import { Observable } from "rxjs";
import { Painting } from './../../../services/products.service';
import { CompleteOrder, RemoveProduct } from './../../../state/bag.actions';
import { BagState } from './../../../state/bag.state';


@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BagComponent implements OnInit {

  form!: FormGroup
  formComplete!: boolean

  @Select(BagState.getBag) products$!: Observable<Painting[]>
  @Select(BagState.getLoading) loading$!: Observable<boolean>
  @Select(BagState.getLoaded) loaded$!: Observable<boolean>
  @Select(BagState.getError) error$!: Observable<boolean>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      number: new FormControl('', [Validators.minLength(9), Validators.maxLength(13), Validators.required]),
      address: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      zip: new FormControl('', [Validators.required]),
      diffAddress: new FormControl(''),
      billingMethod: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      additional: new FormControl('', [Validators.maxLength(1000)]),
      agreeToSending: new FormControl('', [Validators.requiredTrue]),
      agreeWithPolicy: new FormControl('', [Validators.requiredTrue])
    })
  }

  completeOrder(products: Painting[]): void {
    if (this.form.valid) {
      const formData = { ...this.form.value }
      this.store.dispatch(new CompleteOrder({ ...formData, products: products }))
      this.loaded$.subscribe(result => result ? this.form.reset() : '')
      this.formComplete = true
    }
  }
  
  remove(product: Painting) {
    this.store.dispatch(new RemoveProduct(product))
  }
}

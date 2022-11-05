import { GetSearchProduct, CleanSearchProduct } from './../../state/categories.actions';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoriesState } from 'src/app/state/categories.state';
import { RemoveProduct } from './../../state/bag.actions';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { BagState } from './../../state/bag.state';
import { Painting } from './../../services/products.service';
import { attention } from './../../app.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [attention],
})

export class HeaderComponent implements OnInit {

  phone = '0502864257'
  active: Boolean = false
  form!: FormGroup

  @Select(BagState.getBag) products$!: Observable<Painting[]>
  @Select(CategoriesState.getSearchProduct) searchProducts$!: Observable<Painting[]>
  @Select(BagState.getTotalPrice) totalPrice$!: Observable<number>
  @Select(CategoriesState.getCategories) categories$!: Observable<String[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      category: new FormControl('All categories', [Validators.required]),
      input: new FormControl('', [Validators.required]),
    })
  }

  onEvent(event: any) {
    event.stopPropagation()
  }

  search() {
    if (this.form.valid) {
      const formData = { ...this.form.value }
      this.store.dispatch(new GetSearchProduct(formData.category, formData.input))
    }
  }

  reset() {
    this.form.controls['input'].reset()
    this.store.dispatch(new CleanSearchProduct())
  }

  remove(product: Painting) {
    this.store.dispatch(new RemoveProduct(product))
  }
}


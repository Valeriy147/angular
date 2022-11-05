import { FormGroup, FormControl } from '@angular/forms';
import { AddProduct, RemoveProduct } from './../../state/bag.actions';
import { BagState } from './../../state/bag.state';
import { fade } from './../../app.animations';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { switchMap } from 'rxjs';
import { Painting } from './../../services/products.service';
import { Select, Store } from '@ngxs/store';
import { GetCategoryProducts, GetCategories, GetFilteredProducts } from './../../state/categories.actions';
import { CategoriesState } from 'src/app/state/categories.state';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  animations: [fade],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class ProductsListComponent implements OnInit {

  actualCategory!: String;
  private sub: any;
  view: String = 'grid'
  form!: FormGroup


  @Select(CategoriesState.getCategoryProducts) products$!: Observable<Painting[]>
  @Select(CategoriesState.getLoadingProducts) loadingProducts$!: Observable<boolean>
  @Select(CategoriesState.getLoadedProducts) loadedProducts$!: Observable<boolean>
  @Select(CategoriesState.getCategories) categories$!: Observable<String[]>
  @Select(CategoriesState.getLoadingCategories) loadingCategories$!: Observable<boolean>
  @Select(CategoriesState.getLoadedCategories) loadedCategories$!: Observable<boolean>
  @Select(BagState.getIds) ids$!: Observable<Number[]>


  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        tap(params => (params ? this.actualCategory = params['category'] : '')),
        switchMap(params => (params ? this.store.dispatch(new GetCategoryProducts(this.actualCategory)) : ''))
      )
      .subscribe();
    this.store.dispatch(new GetCategories())

    this.form = new FormGroup({
      JohannesVermeer: new FormControl(''),
      EdvardMunch: new FormControl(''),
      LeonardodaVinci: new FormControl(''),
      VincentvanGogh: new FormControl(''),
      PabloPicasso: new FormControl(''),
      score5: new FormControl(''),
      score4: new FormControl(''),
      score3: new FormControl(''),
      score2: new FormControl(''),
      score1: new FormControl(''),
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addProduct(product: Painting) {
    this.store.dispatch(new AddProduct({ ...product }))
  }

  remove(product: Painting) {
    this.store.dispatch(new RemoveProduct(product))
    console.log(product)
  }

  submitFilters(): void {
    let ratings = []
    let authors = []
    if (this.form.value.score5) {
      ratings.push(5)
    }
    if (this.form.value.score4) {
      ratings.push(4)
    }
    if (this.form.value.score3) {
      ratings.push(3)
    }
    if (this.form.value.score2) {
      ratings.push(2)
    }
    if (this.form.value.score1) {
      ratings.push(1)
    }
    if (this.form.value.JohannesVermeer) {
      authors.push('Johannes+Vermeer')
    }
    if (this.form.value.EdvardMunch) {
      authors.push('Edvard+Munch')
    }
    if (this.form.value.LeonardodaVinci) {
      authors.push('Leonardo+da+Vinci')
    }
    if (this.form.value.VincentvanGogh) {
      authors.push('Vincent+van+Gogh')
    }
    if (this.form.value.PabloPicasso) {
      authors.push('Pablo+Picasso')
    }
    this.store.dispatch(new GetFilteredProducts(ratings, authors))
  }

  reset() {
    this.form.reset()
  }
}


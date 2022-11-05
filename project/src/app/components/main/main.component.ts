import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs";
import { Store, Select } from '@ngxs/store';
import { CategoriesState } from 'src/app/state/categories.state';
import { ProductsState } from 'src/app/state/products.state';
import { AddProduct, RemoveProduct } from './../../state/bag.actions';
import { BagState } from './../../state/bag.state';
import { GetBestsellers, GetTopRankings } from './../../state/products.actions';
import { GetCategories } from './../../state/categories.actions';
import { Painting } from '../../services/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent implements OnInit {

  @Select(CategoriesState.getCategories) categories$!: Observable<String[]>
  @Select(CategoriesState.getLoadingCategories) loadingCategories$!: Observable<boolean>
  @Select(CategoriesState.getLoadedCategories) loadedCategories$!: Observable<boolean>
  @Select(ProductsState.getBestsellers) bestsellers$!: Observable<Painting[]>
  @Select(ProductsState.getBestsellersCarousel) bestsellersCarousel$!: Observable<Painting[]>
  @Select(ProductsState.getTopRankings) topRanking$!: Observable<Painting[]>
  @Select(ProductsState.getLoaded) loadedProducts$!: Observable<boolean>
  @Select(ProductsState.getLoading) loadingProducts$!: Observable<boolean>
  @Select(BagState.getIds) ids$!: Observable<Number[]>


  constructor(private store: Store) { }

  addProduct(product: Painting) {
    this.store.dispatch(new AddProduct({ ...product }))
  }

  ngOnInit(): void {
    this.store.dispatch([new GetCategories(), new GetBestsellers(), new GetTopRankings()])
  }

  remove(product: Painting) {
    this.store.dispatch(new RemoveProduct(product))
  }
}


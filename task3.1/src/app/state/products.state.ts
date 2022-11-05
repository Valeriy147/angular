import { startWith } from 'rxjs';
import { interval, switchMap } from 'rxjs';
import { map } from 'rxjs';
import { ProductsService, Painting } from '../services/products.service';
import {
  GetBestsellers,
  GetBestsellersSuccess,
  GetBestsellersFailed,
  GetTopRankings,
  GetTopRankingsSuccess,
  GetTopRankingsFailed,
  GetProductById,
  GetProductByIdSuccess,
  GetProductByIdFail,
  GetBestsellersCarouselSuccess,
  GetBestsellersCarouselFailed
} from './products.actions';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';


export class ProductsStateModel {
  topRanking!: Painting[];
  bestsellers!: Painting[];
  bestsellersCarousel!: Painting[]
  product!: Painting;
  loading!: boolean;
  loaded!: boolean
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    bestsellers: [],
    bestsellersCarousel: [],
    topRanking: [],
    product: {
      id: 0,
      img: '',
      author: '',
      name: '',
      year: 0,
      price: 0
    },
    loading: false,
    loaded: false
  }
})
@Injectable()
export class ProductsState {

  constructor(private productsService: ProductsService) { }

  @Selector() static getTopRankings(state: ProductsStateModel) {
    return state.topRanking;
  }

  @Selector() static getBestsellers(state: ProductsStateModel) {
    return state.bestsellers;
  }
  @Selector() static getBestsellersCarousel(state: ProductsStateModel) {
    return state.bestsellersCarousel;
  }

  @Selector() static getProductById(state: ProductsStateModel) {
    return state.product;
  }

  @Selector() static getLoaded(state: ProductsStateModel) {
    return !state.loading && state.loaded
  }

  @Selector() static getLoading(state: ProductsStateModel) {
    return state.loading && !state.loaded
  }


  @Action(GetBestsellers)
  getBestsellers(ctx: StateContext<ProductsStateModel>) {
    this.productsService.getCategoryProducts("bestsellers")
      .subscribe(
        response => ctx.dispatch(new GetBestsellersSuccess(response)),
        error => ctx.dispatch(new GetBestsellersFailed(error))
      )
  }

  @Action(GetBestsellersSuccess)
  getBestsellersSuccess(ctx: StateContext<ProductsStateModel>, action: GetBestsellersSuccess) {
    ctx.patchState({
      loading: false,
      loaded: true,
      bestsellers: action.data,
    });
  }

  @Action(GetBestsellersFailed)
  getBestsellersFailed(ctx: StateContext<ProductsStateModel>) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
  }

  @Action(GetTopRankings)
  getTopRankings(ctx: StateContext<ProductsStateModel>) {
    this.productsService.getCategoryProducts("topRanking")
      .subscribe(
        response => ctx.dispatch(new GetTopRankingsSuccess(response)),
        error => ctx.dispatch(new GetTopRankingsFailed(error))
      )
  }

  @Action(GetTopRankingsSuccess)
  getTopRankingsSuccess(ctx: StateContext<ProductsStateModel>, action: GetBestsellersCarouselSuccess) {
    ctx.patchState({
      loading: false,
      loaded: true,
      topRanking: action.data,
    });
  }

  @Action(GetTopRankingsFailed)
  getTopRankingsFailed(ctx: StateContext<ProductsStateModel>) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
  }

  @Action(GetProductById)
  get(ctx: StateContext<ProductsStateModel>, { id }: GetProductById) {
    this.productsService.getById(id).subscribe(
      response => ctx.dispatch(new GetProductByIdSuccess(response)),
      err => ctx.dispatch(new GetProductByIdFail(err))
    )
  }

  @Action(GetProductByIdSuccess)
  getCommentSuccess(ctx: StateContext<ProductsStateModel>, { data }: GetProductByIdSuccess) {
    ctx.patchState({
      product: data
    })
  }

  @Action(GetProductByIdFail)
  getCommentFail(ctx: StateContext<ProductsStateModel>, { err }: GetProductByIdFail) {
    console.warn(err)
  }

  ngxsOnInit(ctx: StateContext<ProductsStateModel>) {
    let i = 0;
    const interval$ = interval(3000);

    this.productsService.getCategoryProducts('bestsellers')
      .pipe(
        switchMap(products => {
          return interval$
            .pipe(
              startWith(products),
              map(() => {
                i++;
                return [products[i % products.length],
                products[(i + 1) % products.length],
                products[(i + 2) % products.length]]
              })
            );
        })
      ).subscribe(
        response => ctx.dispatch(new GetBestsellersCarouselSuccess(response)),
        error => ctx.dispatch(new GetBestsellersCarouselFailed(error))
      )

  }

  @Action(GetBestsellersCarouselSuccess)
  getBestsellersCarouselSuccess(ctx: StateContext<ProductsStateModel>, action: GetBestsellersCarouselSuccess) {
    ctx.patchState({
      loading: false,
      loaded: true,
      bestsellersCarousel: action.data,
    });
  }

  @Action(GetBestsellersCarouselFailed)
  getBestsellersCarouselFailed(ctx: StateContext<ProductsStateModel>) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
  }


}

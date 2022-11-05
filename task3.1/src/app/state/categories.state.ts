import {
  GetCategoryProducts,
  GetCategoryProductsSuccess,
  GetCategoryProductsFailed,
  GetSearchProduct,
  GetSearchProductSuccess,
  GetSearchProductFailed,
  CleanSearchProduct,
  GetFilteredProducts,
  GetFilteredProductsSuccess,
  GetFilteredProductsFailed
} from './categories.actions';
import { ProductsService, Painting } from './../services/products.service';
import { GetCategories, GetCategoriesSuccess, GetCategoriesFailed } from './categories.actions';
import { State, Action, Selector, StateContext, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';


export class CategoriesStateModel {
  categories!: String[];
  categoryProducts!: Painting[];
  searchProducts!: Painting[]
  loadingProducts!: boolean;
  loadedProducts!: boolean;
  loadingCategories!: boolean;
  loadedCategories!: boolean;
}

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
    categoryProducts: [],
    searchProducts: [],
    loadingProducts: false,
    loadedProducts: false,
    loadingCategories: false,
    loadedCategories: false
  }
})
@Injectable()
export class CategoriesState implements NgxsOnInit {

  @Selector() static getCategories(state: CategoriesStateModel) {
    return state.categories;
  }
  @Selector() static getCategoryProducts(state: CategoriesStateModel) {
    return state.categoryProducts;
  }
  @Selector() static getSearchProduct(state: CategoriesStateModel) {
    return state.searchProducts;
  }
  @Selector() static getLoadedCategories(state: CategoriesStateModel) {
    return state.loadedCategories && !state.loadingCategories;
  }
  @Selector() static getLoadingCategories(state: CategoriesStateModel) {
    return state.loadingCategories && !state.loadedCategories;
  }
  @Selector() static getLoadingProducts(state: CategoriesStateModel) {
    return state.loadingProducts && !state.loadedProducts;
  }
  @Selector() static getLoadedProducts(state: CategoriesStateModel) {
    return state.loadedProducts && !state.loadingProducts;
  }

  constructor(private productsService: ProductsService) { }

  ngxsOnInit(ctx: StateContext<CategoriesStateModel>) {
  }

  @Action(GetCategories)
  getCategories(ctx: StateContext<CategoriesStateModel>) {
    ctx.patchState({
      loadingCategories: true,
      loadedCategories: false,
    });
    this.productsService.getCategories().subscribe(
      response => ctx.dispatch(new GetCategoriesSuccess(response)),
      error => ctx.dispatch(new GetCategoriesFailed(error))
    )
  }

  @Action(GetCategoriesSuccess)
  getCategoriesSuccess(ctx: StateContext<CategoriesStateModel>, action: GetCategoriesSuccess) {
    ctx.patchState({
      loadingCategories: false,
      loadedCategories: true,
      categories: action.data,
    });
  }

  @Action(GetCategoriesFailed)
  getCategoriesFailed(ctx: StateContext<CategoriesStateModel>) {
    ctx.patchState({
      loadingCategories: false,
      loadedCategories: false,
    });
  }

  @Action(GetCategoryProducts)
  getCategoryProducts(ctx: StateContext<CategoriesStateModel>, { category }: GetCategoryProducts) {
    ctx.patchState({
      loadingProducts: true,
      loadedProducts: false,
    });
    return this.productsService.getCategoryProducts(category).subscribe(
      response => ctx.dispatch(new GetCategoryProductsSuccess(response)),
      err => ctx.dispatch(new GetCategoryProductsFailed(err))
    )
  }


  @Action(GetCategoryProductsSuccess)
  getCategoryProductsSuccess(ctx: StateContext<CategoriesStateModel>, response: GetCategoryProductsSuccess) {
    ctx.patchState({
      loadingProducts: false,
      loadedProducts: true,
      categoryProducts: response.data
    });
  }

  @Action(GetCategoryProductsFailed)
  getCategoryProductsFailed(ctx: StateContext<CategoriesStateModel>, err: GetCategoryProductsFailed) {
    ctx.patchState({
      loadingProducts: false,
      loadedProducts: false,
    });
  }


  @Action(GetSearchProduct)
  getSearchProduct(ctx: StateContext<CategoriesStateModel>, { category, name }: GetSearchProduct) {
    ctx.patchState({
      loadingProducts: true,
      loadedProducts: false,
    });
    return this.productsService.getSearchProduct(category, name).subscribe(
      response => ctx.dispatch(new GetSearchProductSuccess(response)),
      err => ctx.dispatch(new GetSearchProductFailed(err))
    )
  }


  @Action(GetSearchProductSuccess)
  getSearchProductSuccess(ctx: StateContext<CategoriesStateModel>, response: GetSearchProductSuccess) {
    ctx.patchState({
      loadingProducts: false,
      loadedProducts: true,
      searchProducts: response.data
    });
  }

  @Action(GetSearchProductFailed)
  getSearchProductFailed(ctx: StateContext<CategoriesStateModel>, err: GetSearchProductFailed) {
    ctx.patchState({
      loadingProducts: false,
      loadedProducts: false,
    });
  }

  @Action(CleanSearchProduct)
  cleanSearchProduct(ctx: StateContext<CategoriesStateModel>) {
    ctx.patchState({
      searchProducts: []
    });
  }

  @Action(GetFilteredProducts)
  getFilteredProducts(ctx: StateContext<CategoriesStateModel>, { ratings, authors }: GetFilteredProducts) {
    ctx.patchState({
      loadingProducts: true,
      loadedProducts: false,
    });
    return this.productsService.getFilteredProducts(ratings, authors).subscribe(
      response => ctx.dispatch(new GetFilteredProductsSuccess(response)),
      err => ctx.dispatch(new GetFilteredProductsFailed(err))
    )
  }


  @Action(GetFilteredProductsSuccess)
  getFilteredProductsSuccess(ctx: StateContext<CategoriesStateModel>, response: GetFilteredProductsSuccess) {
    ctx.patchState({
      loadingProducts: false,
      loadedProducts: true,
      categoryProducts: response.data
    });
  }

  @Action(GetFilteredProductsFailed)
  getFilteredProductsFailed(ctx: StateContext<CategoriesStateModel>, err: GetFilteredProductsFailed) {
    ctx.patchState({
      loadingProducts: false,
      loadedProducts: false,
    });
  }

}



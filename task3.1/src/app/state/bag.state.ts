import { Order } from './../services/bag.service';
import { BagService } from 'src/app/services/bag.service';
import { Painting } from '../services/products.service';
import { AddProduct, CompleteOrder, CompleteOrderSuccess, CompleteOrderFail, RemoveProduct } from './bag.actions';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';


export class BagStateModel {
  products!: Painting[]
  totalPrice!: number
  ids!: Number[]
  orders!: Order[]
  loading!: Boolean
  loaded!: Boolean
}

@State<BagStateModel>({
  name: 'bag',
  defaults: {
    products: [],
    totalPrice: 0,
    ids: [],
    orders: [],
    loading: false,
    loaded: false
  }
})
@Injectable()
export class BagState {

  constructor(private bagService: BagService) { }

  @Selector() static getBag(state: BagStateModel) {
    return state.products;
  }

  @Selector() static getTotalPrice(state: BagStateModel) {
    return state.totalPrice;
  }

  @Selector() static getIds(state: BagStateModel) {
    return state.ids;
  }

  @Selector() static getOrders(state: BagStateModel) {
    return state.orders;
  }

  @Selector() static getLoading(state: BagStateModel) {
    return state.loading && !state.loaded;
  }

  @Selector() static getError(state: BagStateModel) {
    return !state.loading && !state.loaded;
  }

  @Selector() static getLoaded(state: BagStateModel) {
    return state.loaded && !state.loading;
  }

  @Action(AddProduct)
  add({ getState, patchState }: StateContext<BagStateModel>, { payload }: AddProduct) {
    const state = getState()
    patchState({
      products: [...state.products, payload],
      totalPrice: state.totalPrice + payload.price,
      ids: [...state.ids, payload.id]
    })
  }

  @Action(RemoveProduct)
  remove({ getState, patchState }: StateContext<BagStateModel>, { payload }: RemoveProduct) {
    const state = getState()
    patchState({
      products: [...state.products.filter((product) => product.id != payload.id)],
      ids: [...state.ids.filter((id) => id != payload.id)],
      totalPrice: state.totalPrice - payload.price
    })
  }

  @Action(CompleteOrder)
  order(ctx: StateContext<BagStateModel>, { order }: CompleteOrder) {
    ctx.patchState({
      loading: true,
      loaded: false,
    });
    this.bagService.completeOrder(order).subscribe(
      response => ctx.dispatch(new CompleteOrderSuccess(response)),
      error => ctx.dispatch(new CompleteOrderFail(error))
    )
  }

  @Action(CompleteOrderSuccess)
  orderSuccess({ patchState, getState }: StateContext<BagStateModel>, { data }: CompleteOrderSuccess) {
    const state = getState().orders
    patchState({
      loading: false,
      loaded: true,
      orders: [...state, data]
    })
  }

  @Action(CompleteOrderFail)
  orderFail(ctx: StateContext<BagStateModel>, { err }: CompleteOrderFail) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
    console.warn(err)
  }
}


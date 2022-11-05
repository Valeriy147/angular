import { Order } from './../services/bag.service';
import { Painting } from './../services/products.service';

export class AddProduct {
  static readonly type = '[Bag] Add'
  constructor(public payload: Painting) { }
}

export class RemoveProduct {
  static readonly type = '[Bag] Remove'
  constructor(public payload: Painting) { }
}

export class CompleteOrder {
  static readonly type = '[Bag] Complete Order'
  constructor(public order: Order) { }
}

export class CompleteOrderSuccess {
  static readonly type = '[Comments] Complete Order Success'
  constructor(public data: any) { }
}

export class CompleteOrderFail {
  static readonly type = '[Comments] Complete Order Fail'
  constructor(public err: any) { }
}



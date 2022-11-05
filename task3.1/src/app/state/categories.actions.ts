import { Painting } from './../services/products.service';
export class GetCategories {
  static readonly type = '[Categories] Get Categories'
}

export class GetCategoriesSuccess {
  static readonly type = "[Categories] Get Categories Success";

  constructor(public data: String[]) {
  }
}

export class GetCategoriesFailed {
  static readonly type = "[Categories] Get Categories Failed";

  constructor(public err: any) {
  }
}

export class GetCategoryProducts {
  static readonly type = '[Categories] Get Category Products'
  constructor(public category: String) { }
}

export class GetCategoryProductsSuccess {
  static readonly type = "[Categories] Get Category Products Success";

  constructor(public data: Painting[]) {
  }
}

export class GetCategoryProductsFailed {
  static readonly type = "[Categories] Get Category Products Failed";

  constructor(public err: any) {
  }
}

export class GetSearchProduct {
  static readonly type = '[Categories] Get Search Products'
  constructor(public category: String, public name: String) { }
}

export class GetSearchProductSuccess {
  static readonly type = "[Categories] Get Search Products Success";

  constructor(public data: Painting[]) {
  }
}

export class GetSearchProductFailed {
  static readonly type = "[Categories] Get Search Products Failed";

  constructor(public err: any) {
  }
}

export class CleanSearchProduct {
  static readonly type = '[Categories] Clean Search Products'
  constructor() { }
}


export class GetFilteredProducts {
  static readonly type = '[Categories] Get Filtered Products'
  constructor(public ratings: number[], public authors: string[]) { }
}

export class GetFilteredProductsSuccess {
  static readonly type = "[Categories] Get Filtered Products Success";
  constructor(public data: Painting[]) {
  }
}

export class GetFilteredProductsFailed {
  static readonly type = "[Categories] Get Filtered Products Failed";
  constructor(public err: any) {
  }
}

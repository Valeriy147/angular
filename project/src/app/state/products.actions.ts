export class GetBestsellers {
  static readonly type = '[Products] Get Bestsellers '
}

export class GetBestsellersSuccess {
  static readonly type = '[Products] Get Bestsellers Success'
  constructor(public data: any) { }
}

export class GetBestsellersFailed {
  static readonly type = '[Products] Get Bestsellers Failed'
  constructor(public err: any) { }
}

export class GetTopRankings {
  static readonly type = '[Products] Get Top Ranking'
}

export class GetTopRankingsSuccess {
  static readonly type = '[Products] Get Top Ranking Success'
  constructor(public data: any) { }
}

export class GetTopRankingsFailed {
  static readonly type = '[Products] Get Top Ranking Failed'
  constructor(public err: any) { }
}

export class GetProductById {
  static readonly type = '[Products] Get Product By Id'
  constructor(public id: Number) { }

}
export class GetProductByIdSuccess {
  static readonly type = '[Products] Get Product By Id Success'
  constructor(public data: any) { }
}

export class GetProductByIdFail {
  static readonly type = '[Products] Get Product By Id Fail'
  constructor(public err: any) { }
}

export class GetBestsellersCarouselSuccess {
  static readonly type = '[Products] Get Bestsellers Carousel Success'
  constructor(public data: any) { }
}

export class GetBestsellersCarouselFailed {
  static readonly type = '[Products] Get Bestsellers Carousel Failed'
  constructor(public err: any) { }
}

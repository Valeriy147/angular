import { fade, slideInL, slideInR } from './../../app.animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Painting } from './../../services/products.service';
import { Store, Select } from '@ngxs/store';
import { ProductsState } from 'src/app/state/products.state';
import { ChangeDetectionStrategy } from '@angular/core';
import { GetProductById } from './../../state/products.actions';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [fade, slideInL, slideInR],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent implements OnInit, OnDestroy {

  private subRoute: any;
  private subMeta: any
  prevChoice!: String
  choice: String = 'Description'


  @Select(ProductsState.getProductById) product$!: Observable<Painting>
  @Select(ProductsState.getLoaded) loaded$!: Observable<boolean>
  @Select(ProductsState.getLoading) loading$!: Observable<boolean>

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public title: Title,
    public meta: Meta
  ) { }

  ngOnInit(): void {
    this.subRoute = this.route.params
      .pipe(
        switchMap(params => (params ? (this.store.dispatch(new GetProductById(+params['id']))) : ''))
      )
      .subscribe()

    this.subMeta = this.product$.subscribe(prod => {
      this.meta.addTags([
        { name: 'description', content: prod.name + ' page' }
      ])
      this.title.setTitle(prod.name)
    })
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
    this.subMeta.unsubscribe()
  }

  setChoice(choice: String) {
    this.prevChoice = this.choice
    this.choice = choice
  }
}

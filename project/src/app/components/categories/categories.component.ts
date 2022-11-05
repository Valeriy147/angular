import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { CategoriesState } from 'src/app/state/categories.state';
import { GetCategories } from './../../state/categories.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CategoriesComponent implements OnInit {

  @Select(CategoriesState.getCategories) categories$!: Observable<String[]>
  @Select(CategoriesState.getLoadingCategories) loading$!: Observable<boolean>
  @Select(CategoriesState.getLoadedCategories) loaded$!: Observable<boolean>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetCategories())
  }
}

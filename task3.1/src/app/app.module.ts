import { CommentsState } from './state/comments.state';
import { BagState } from './state/bag.state';
import { ProductsState } from './state/products.state';
import { CategoriesState } from 'src/app/state/categories.state';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MainComponent } from './components/main/main.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PhonePipe } from './pipes/phone.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { HeaderComponent } from './components/header/header.component';
import { CommentsComponent } from './components/product/comments/comments.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { LoaderComponent } from './components/loader/loader.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    HeaderComponent,
    CategoriesComponent,
    MainComponent,
    PhonePipe,
    CommentsComponent,
    ProductComponent,
    ProductsListComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([CategoriesState, ProductsState, BagState, CommentsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

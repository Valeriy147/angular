import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductComponent } from './components/product/product.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'category/:category', component: ProductsListComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'bag', loadChildren: () => import('./components/header/bag/bag.module').then(module => module.BagModule) },
  { path: 'about-us', loadChildren: () => import('./components/header/about-us/about-us.module').then(module => module.AboutUsModule) },
  { path: 'careers', loadChildren: () => import('./components/header/careers/careers.module').then(module => module.CareersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

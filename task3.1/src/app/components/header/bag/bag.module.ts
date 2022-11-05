import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { BagService } from "src/app/services/bag.service";
import { BagComponent } from "./bag.component";

@NgModule({
  declarations: [
    BagComponent
  ],

  imports: [
    RouterModule.forChild([
      { path: '', component: BagComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],

  providers: [
    BagService
  ],

  exports: [
    RouterModule,
  ]

})
export class BagModule { }

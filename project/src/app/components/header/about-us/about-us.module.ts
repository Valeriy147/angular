import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AboutUsComponent } from "./about-us.component";

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: AboutUsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AboutUsModule {

}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CauldronComponent } from "../app/cauldron/cauldron.component";

const routes: Routes = [{ path: "", component: CauldronComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

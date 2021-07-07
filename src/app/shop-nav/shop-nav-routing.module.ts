import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopNavPage } from './shop-nav.page';

const routes: Routes = [
  {
    path: '',
    component: ShopNavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopNavPageRoutingModule {}

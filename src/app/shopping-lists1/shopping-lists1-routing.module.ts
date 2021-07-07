import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingLists1Page } from './shopping-lists1.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingLists1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingLists1PageRoutingModule {}

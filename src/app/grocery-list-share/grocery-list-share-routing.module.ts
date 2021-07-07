import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroceryListSharePage } from './grocery-list-share.page';

const routes: Routes = [
  {
    path: '',
    component: GroceryListSharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroceryListSharePageRoutingModule {}

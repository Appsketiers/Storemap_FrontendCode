import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastOrders1Page } from './past-orders1.page';

const routes: Routes = [
  {
    path: '',
    component: PastOrders1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastOrders1PageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyingHabitPage } from './buying-habit.page';

const routes: Routes = [
  {
    path: '',
    component: BuyingHabitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyingHabitPageRoutingModule {}

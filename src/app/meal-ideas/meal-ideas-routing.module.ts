import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealIdeasPage } from './meal-ideas.page';

const routes: Routes = [
  {
    path: '',
    component: MealIdeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealIdeasPageRoutingModule {}

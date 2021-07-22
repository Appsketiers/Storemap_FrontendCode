import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealIdeasListPage } from './meal-ideas-list.page';

const routes: Routes = [
  {
    path: '',
    component: MealIdeasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealIdeasListPageRoutingModule {}

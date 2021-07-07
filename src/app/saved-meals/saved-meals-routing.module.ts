import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedMealsPage } from './saved-meals.page';

const routes: Routes = [
  {
    path: '',
    component: SavedMealsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedMealsPageRoutingModule {}

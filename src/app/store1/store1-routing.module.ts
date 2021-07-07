import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Store1Page } from './store1.page';

const routes: Routes = [
  {
    path: '',
    component: Store1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Store1PageRoutingModule {}

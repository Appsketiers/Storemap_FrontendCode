import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresListPage } from './stores-list.page';

const routes: Routes = [
  {
    path: '',
    component: StoresListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresListPageRoutingModule {}

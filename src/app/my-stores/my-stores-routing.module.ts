import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoresPage } from './my-stores.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoresPageRoutingModule {}

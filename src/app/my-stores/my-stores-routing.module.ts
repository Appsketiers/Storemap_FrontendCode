import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoresPage } from './my-stores.page';
import { MyStorePopComponent } from '../my-store-pop/my-store-pop.component';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  {
    path: '',
    component: MyStoresPage
  }
];

@NgModule({
  declarations: [
    MyStorePopComponent
    ],
  imports: [RouterModule.forChild(routes), IonicModule],
  exports: [RouterModule],
})
export class MyStoresPageRoutingModule {}

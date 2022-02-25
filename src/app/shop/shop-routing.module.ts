import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ShopPage } from './shop.page';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  {
    path: '',
    component: ShopPage
  }
];

@NgModule({

  imports: [RouterModule.forChild(routes), IonicModule],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}

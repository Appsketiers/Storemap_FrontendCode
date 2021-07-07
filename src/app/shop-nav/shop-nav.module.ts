import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopNavPageRoutingModule } from './shop-nav-routing.module';

import { ShopNavPage } from './shop-nav.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopNavPageRoutingModule
  ],
  declarations: [ShopNavPage]
})
export class ShopNavPageModule {}

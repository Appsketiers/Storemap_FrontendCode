import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoresPageRoutingModule } from './my-stores-routing.module';

import { MyStoresPage } from './my-stores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoresPageRoutingModule
  ],
  declarations: [MyStoresPage]
})
export class MyStoresPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingLists1PageRoutingModule } from './shopping-lists1-routing.module';

import { ShoppingLists1Page } from './shopping-lists1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingLists1PageRoutingModule
  ],
  declarations: [ShoppingLists1Page]
})
export class ShoppingLists1PageModule {}

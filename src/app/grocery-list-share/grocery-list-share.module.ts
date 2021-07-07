import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceryListSharePageRoutingModule } from './grocery-list-share-routing.module';

import { GroceryListSharePage } from './grocery-list-share.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroceryListSharePageRoutingModule
  ],
  declarations: [GroceryListSharePage]
})
export class GroceryListSharePageModule {}

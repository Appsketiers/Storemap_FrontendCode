import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListsPageRoutingModule } from './shopping-lists-routing.module';

import { ShoppingListsPage } from './shopping-lists.page';
import { MyListComponent } from '../my-list/my-list.component';
import { SharedListComponent } from '../shared-list/shared-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingListsPageRoutingModule
  ],

  declarations: [ShoppingListsPage,MyListComponent,SharedListComponent],
  entryComponents: [MyListComponent,SharedListComponent],
})
export class ShoppingListsPageModule {}

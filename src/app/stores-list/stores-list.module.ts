import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoresListPageRoutingModule } from './stores-list-routing.module';

import { StoresListPage } from './stores-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoresListPageRoutingModule
  ],
  declarations: [StoresListPage]
})
export class StoresListPageModule {}

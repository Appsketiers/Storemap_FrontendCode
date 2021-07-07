import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastOrders1PageRoutingModule } from './past-orders1-routing.module';

import { PastOrders1Page } from './past-orders1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastOrders1PageRoutingModule
  ],
  declarations: [PastOrders1Page]
})
export class PastOrders1PageModule {}

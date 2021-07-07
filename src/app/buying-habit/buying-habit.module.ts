import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyingHabitPageRoutingModule } from './buying-habit-routing.module';

import { BuyingHabitPage } from './buying-habit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyingHabitPageRoutingModule
  ],
  declarations: [BuyingHabitPage]
})
export class BuyingHabitPageModule {}

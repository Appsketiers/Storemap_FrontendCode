import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedMealsPageRoutingModule } from './saved-meals-routing.module';

import { SavedMealsPage } from './saved-meals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedMealsPageRoutingModule
  ],
  declarations: [SavedMealsPage]
})
export class SavedMealsPageModule {}

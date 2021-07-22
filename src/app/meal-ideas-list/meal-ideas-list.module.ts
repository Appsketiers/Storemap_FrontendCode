import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealIdeasListPageRoutingModule } from './meal-ideas-list-routing.module';

import { MealIdeasListPage } from './meal-ideas-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealIdeasListPageRoutingModule
  ],
  declarations: [MealIdeasListPage]
})
export class MealIdeasListPageModule {}

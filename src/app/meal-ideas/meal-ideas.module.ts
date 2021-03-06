import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealIdeasPageRoutingModule } from './meal-ideas-routing.module';

import { MealIdeasPage } from './meal-ideas.page';
import { IonicRatingModule } from 'ionic4-rating';
import { RatingComponent } from '../rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealIdeasPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [MealIdeasPage,RatingComponent]
})
export class MealIdeasPageModule {}

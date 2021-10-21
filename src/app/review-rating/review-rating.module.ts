import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewRatingPageRoutingModule } from './review-rating-routing.module';

import { ReviewRatingPage } from './review-rating.page';
import { IonicRatingModule } from 'ionic4-rating';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewRatingPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [ReviewRatingPage]
})
export class ReviewRatingPageModule {}

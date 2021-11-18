import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreDetailPageRoutingModule } from './store-detail-routing.module';

import { StoreDetailPage } from './store-detail.page';
import { IonicRatingModule } from 'ionic4-rating';
import { RatingComponent } from '../rating/rating.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreDetailPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [StoreDetailPage,RatingComponent]
})
export class StoreDetailPageModule {}

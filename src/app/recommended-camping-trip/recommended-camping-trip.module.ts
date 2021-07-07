import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendedCampingTripPageRoutingModule } from './recommended-camping-trip-routing.module';

import { RecommendedCampingTripPage } from './recommended-camping-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedCampingTripPageRoutingModule
  ],
  declarations: [RecommendedCampingTripPage]
})
export class RecommendedCampingTripPageModule {}

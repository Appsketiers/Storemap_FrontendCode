import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendedCampingTripPage } from './recommended-camping-trip.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendedCampingTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedCampingTripPageRoutingModule {}

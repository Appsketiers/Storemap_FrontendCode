import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafetyAwarenessDeatilsPage } from './safety-awareness-deatils.page';

const routes: Routes = [
  {
    path: '',
    component: SafetyAwarenessDeatilsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafetyAwarenessDeatilsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafetyAwarenessPage } from './safety-awareness.page';

const routes: Routes = [
  {
    path: '',
    component: SafetyAwarenessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafetyAwarenessPageRoutingModule {}

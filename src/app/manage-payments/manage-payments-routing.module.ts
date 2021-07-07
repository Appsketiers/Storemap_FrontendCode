import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagePaymentsPage } from './manage-payments.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePaymentsPageRoutingModule {}

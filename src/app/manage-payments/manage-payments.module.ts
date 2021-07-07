import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePaymentsPageRoutingModule } from './manage-payments-routing.module';

import { ManagePaymentsPage } from './manage-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagePaymentsPageRoutingModule
  ],
  declarations: [ManagePaymentsPage]
})
export class ManagePaymentsPageModule {}

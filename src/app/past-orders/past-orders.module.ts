import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastOrdersPageRoutingModule } from './past-orders-routing.module';

import { PastOrdersPage } from './past-orders.page';
import { PendingComponent } from '../pending/pending.component';
import { CompletedComponent } from '../completed/completed.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastOrdersPageRoutingModule
  ],
  declarations: [PastOrdersPage,PendingComponent,CompletedComponent],
  entryComponents: [PendingComponent,CompletedComponent],
})
export class PastOrdersPageModule {}

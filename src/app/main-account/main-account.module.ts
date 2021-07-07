import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainAccountPageRoutingModule } from './main-account-routing.module';

import { MainAccountPage } from './main-account.page';
import { AdminGuard } from '../providers/admin.guard';
import { HelperService } from '../providers/helper.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    MainAccountPageRoutingModule
  ],
  providers:[HelperService, AdminGuard],
  declarations: [MainAccountPage]
})
export class MainAccountPageModule {}

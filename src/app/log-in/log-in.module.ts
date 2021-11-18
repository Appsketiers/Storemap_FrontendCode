import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogInPageRoutingModule } from './log-in-routing.module';

import { LogInPage } from './log-in.page';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../providers/helper.service';
import { SharedModule } from '../providers/shared/shared.module';
//import { ShowHidePasswordComponent } from '../show-hide-password/show-hide-password.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    LogInPageRoutingModule,
    SharedModule
  ],
  providers: [HelperService],
  declarations: [LogInPage]
})
export class LogInPageModule {}

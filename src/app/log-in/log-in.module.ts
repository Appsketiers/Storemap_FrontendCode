import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogInPageRoutingModule } from './log-in-routing.module';

import { LogInPage } from './log-in.page';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../providers/helper.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    LogInPageRoutingModule
  ],
  providers: [HelperService],
  declarations: [LogInPage]
})
export class LogInPageModule {}

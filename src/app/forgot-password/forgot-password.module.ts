import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../providers/helper.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
 
  ],
  providers: [HelperService],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}

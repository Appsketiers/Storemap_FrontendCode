import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../providers/helper.service';
import { CameraService } from '../providers/camera.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    SignUpPageRoutingModule
  ],
  providers: [HelperService, CameraService],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../providers/helper.service';
import { CameraService } from '../providers/camera.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HelperService, CameraService],
  declarations: [AuthPage]
})
export class AuthModule { }

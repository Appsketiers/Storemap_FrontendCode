import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainFactorPageRoutingModule } from './main-factor-routing.module';

import { MainFactorPage } from './main-factor.page';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../providers/helper.service';
import { AdminGuard } from '../providers/admin.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MainFactorPageRoutingModule,
    HttpClientModule,
    
  ],
  providers:[HelperService, AdminGuard],
  declarations: [MainFactorPage]
})
export class MainFactorPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainHomePageRoutingModule } from './main-home-routing.module';

import { MainHomePage } from './main-home.page';
import { HelperService } from '../providers/helper.service';
import { AdminGuard } from '../providers/admin.guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    MainHomePageRoutingModule
  ],
  providers:[HelperService, AdminGuard],
  declarations: [MainHomePage]
})
export class MainHomePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoFactorPageRoutingModule } from './two-factor-routing.module';

import { TwoFactorPage } from './two-factor.page';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from '../providers/helper.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    TwoFactorPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  
  ],
  providers: [HelperService],
  declarations: [TwoFactorPage]
})
export class TwoFactorPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafetyAwarenessDeatilsPageRoutingModule } from './safety-awareness-deatils-routing.module';

import { SafetyAwarenessDeatilsPage } from './safety-awareness-deatils.page';

import { SharedModule } from '../providers/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafetyAwarenessDeatilsPageRoutingModule,
    SharedModule,
  ],
  declarations: [SafetyAwarenessDeatilsPage]
})
export class SafetyAwarenessDeatilsPageModule {}

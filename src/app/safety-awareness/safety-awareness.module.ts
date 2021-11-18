import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafetyAwarenessPageRoutingModule } from './safety-awareness-routing.module';

import { SafetyAwarenessPage } from './safety-awareness.page';

import { SharedModule } from '../providers/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafetyAwarenessPageRoutingModule,
    SharedModule
  ],
  declarations: [SafetyAwarenessPage]
})
export class SafetyAwarenessPageModule {}

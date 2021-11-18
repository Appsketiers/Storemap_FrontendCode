import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic4-rating';
import { MyStoresPageRoutingModule } from './my-stores-routing.module';

import { MyStoresPage } from './my-stores.page';
import { RatingComponent } from '../rating/rating.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoresPageRoutingModule,
    IonicRatingModule,
  ],
  declarations: [MyStoresPage,RatingComponent]
})
export class MyStoresPageModule {}

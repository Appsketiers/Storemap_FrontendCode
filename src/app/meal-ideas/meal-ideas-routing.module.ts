import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MealIdeasPage } from './meal-ideas.page';
import { CommonModule } from '@angular/common';
import { MealIdeasShoppingComponent } from '../meal-ideas-shopping/meal-ideas-shopping.component';
const routes: Routes = [
  {
    path: '',
    component: MealIdeasPage
  }
];

@NgModule({
  declarations: [
    MealIdeasShoppingComponent
    ],
  imports: [CommonModule,RouterModule.forChild(routes), IonicModule], 
  exports: [RouterModule],
})
export class MealIdeasPageRoutingModule {}

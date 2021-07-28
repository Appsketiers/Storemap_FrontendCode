import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { StoresListPage } from './stores-list.page';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  {
    path: '',
    component: StoresListPage
  }
];

@NgModule({
  declarations: [
  FilterComponent
  ],
  imports: [RouterModule.forChild(routes), IonicModule],
  exports: [RouterModule],
  
})
export class StoresListPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../providers/admin.guard';

import { MainHomePage } from './main-home.page';

const routes: Routes = [
  {
    path: '',
    component: MainHomePage,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./../home/home.module').then( m => m.HomePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainHomePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../providers/admin.guard';

import { MainFactorPage } from './main-factor.page';

const routes: Routes = [
  {
    path: '',
    component: MainFactorPage,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'two-factor',
        pathMatch: 'full'
      },
      {
        path: 'two-factor',
        loadChildren: () => import('./../two-factor/two-factor.module').then( m => m.TwoFactorPageModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainFactorPageRoutingModule {}

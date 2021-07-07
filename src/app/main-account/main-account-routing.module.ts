import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../providers/admin.guard';

import { MainAccountPage } from './main-account.page';

const routes: Routes = [
  {
    path: '',
    component: MainAccountPage,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full'
      },
      {
        path: 'account',
        loadChildren: () => import('./../account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./../change-password/change-password.module').then( m => m.ChangePasswordPageModule)
      },
      {
        path: 'two-factor',
        loadChildren: () => import('./../two-factor/two-factor.module').then( m => m.TwoFactorPageModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('./../edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainAccountPageRoutingModule {}

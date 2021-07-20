import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPage } from './auth.page';



const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: '',
        redirectTo: 'log-in',
        pathMatch: 'full'
      },
      {
        path: 'log-in',
        loadChildren: () => import('./../log-in/log-in.module').then( m => m.LogInPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('../forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('../sign-up/sign-up.module').then( m => m.SignUpPageModule)
      },
      {
        path: 'otp-verification',
        loadChildren: () => import('../otp-verification/otp-verification.module').then( m => m.OtpVerificationPageModule)
      },
     {
        path: 'reset-password',
        loadChildren: () => import('./../reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./../account/account.module').then( m => m.AccountPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}

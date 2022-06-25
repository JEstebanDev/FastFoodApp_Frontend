import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateEmailTokenGuard } from './auth/admin/guards/validate-email-token.guard';
import { ValidateTokenGuard } from './auth/admin/guards/validate-token.guard';
import { BillInfoComponent } from './auth/shared/pages/bill-info/bill-info.component';
import { CheckoutComponent } from './auth/shared/pages/checkout/checkout.component';
import { ForgetPasswordComponent } from './auth/shared/pages/forget-password/forget-password.component';
import { HomeComponent } from './auth/shared/pages/home/home.component';
import { LoginComponent } from './auth/shared/pages/login/login.component';
import { OrderComponent } from './auth/shared/pages/order/order.component';
import { ProfileComponent } from './auth/shared/pages/profile/profile.component';
import { RecoverPasswordComponent } from './auth/shared/pages/recover-password/recover-password.component';
import { SignupComponent } from './auth/shared/pages/signup/signup.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./auth/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'bill',
    component: BillInfoComponent,
  },
  {
    path: 'recover-password/:token',
    component: RecoverPasswordComponent,
    canActivate: [ValidateEmailTokenGuard],
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

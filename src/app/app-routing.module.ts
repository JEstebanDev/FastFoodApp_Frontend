import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/admin/guards/validar-token.guard';
import { BillInfoComponent } from './auth/shared/pages/bill-info/bill-info.component';
import { CheckoutComponent } from './auth/shared/pages/checkout/checkout.component';
import { HomeComponent } from './auth/shared/pages/home/home.component';
import { LoginComponent } from './auth/shared/pages/login/login.component';
import { OrderComponent } from './auth/shared/pages/order/order.component';
import { ProfileComponent } from './auth/shared/pages/profile/profile.component';
import { SignupComponent } from './auth/shared/pages/signup/signup.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./auth/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
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

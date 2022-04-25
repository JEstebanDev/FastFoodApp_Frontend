import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/admin/guards/validar-token.guard';
import { HomeComponent } from './auth/shared/pages/home/home.component';
import { LoginComponent } from './auth/shared/pages/login/login.component';
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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
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

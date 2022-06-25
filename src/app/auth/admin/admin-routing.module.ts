import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AdminbodyComponent } from './adminbody/adminbody.component';
import { GraficsComponent } from './pages/grafics/grafics.component';
import { AdditionalComponent } from './pages/additional/additional.component';
import { CategoryComponent } from './pages/category/category.component';
import { BillComponent } from './pages/bill/bill.component';
import { UserComponent } from './pages/user/user.component';
import { ValidateTypeUserGuard } from './guards/validate-type-user.guard';
const routes: Routes = [
  {
    path: '',
    component: AdminbodyComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [ValidateTypeUserGuard],
        canLoad: [ValidateTypeUserGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [ValidateTypeUserGuard],
        canLoad: [ValidateTypeUserGuard],
        children: [
          {
            path: ':name',
            component: ProductsComponent,
            canActivate: [ValidateTypeUserGuard],
            canLoad: [ValidateTypeUserGuard],
          },
        ],
      },
      {
        path: 'additional',
        component: AdditionalComponent,
        canActivate: [ValidateTypeUserGuard],
        canLoad: [ValidateTypeUserGuard],
        children: [
          {
            path: ':name',
            component: AdditionalComponent,
            canActivate: [ValidateTypeUserGuard],
            canLoad: [ValidateTypeUserGuard],
          },
        ],
      },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [ValidateTypeUserGuard],
        canLoad: [ValidateTypeUserGuard],
        children: [
          {
            path: ':name',
            component: CategoryComponent,
            canActivate: [ValidateTypeUserGuard],
            canLoad: [ValidateTypeUserGuard],
          },
        ],
      },
      {
        path: 'bill',
        component: BillComponent,
        canActivate: [ValidateTypeUserGuard],
        canLoad: [ValidateTypeUserGuard],
      },
      {
        path: 'client',
        component: UserComponent,
        canActivate: [ValidateTypeUserGuard],
        canLoad: [ValidateTypeUserGuard],
      },
      {
        path: 'grafics',
        component: GraficsComponent,
        canActivate: [ValidateTypeUserGuard],
        canLoad: [ValidateTypeUserGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [ValidateTypeUserGuard],
        canLoad: [ValidateTypeUserGuard],
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

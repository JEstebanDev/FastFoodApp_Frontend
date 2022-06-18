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
const routes: Routes = [
  {
    path: '',
    component: AdminbodyComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: ':name',
            component: ProductsComponent,
          },
        ],
      },
      {
        path: 'additional',
        component: AdditionalComponent,
        children: [
          {
            path: ':name',
            component: AdditionalComponent,
          },
        ],
      },
      {
        path: 'category',
        component: CategoryComponent,
        children: [
          {
            path: ':name',
            component: CategoryComponent,
          },
        ],
      },
      {
        path: 'bill',
        component: BillComponent,
      },
      {
        path: 'client',
        component: UserComponent,
      },
      {
        path: 'grafics',
        component: GraficsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
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

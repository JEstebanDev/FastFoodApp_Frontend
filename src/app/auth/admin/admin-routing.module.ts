import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportComponent } from './pages/report/report.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AdminbodyComponent } from './adminbody/adminbody.component';
import { GraficsComponent } from './pages/grafics/grafics.component';
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
      },
      {
        path: 'report',
        component: ReportComponent,
      },

      {
        path: 'grafics',
        component: GraficsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      } /*
      {
        path: '**',
        redirectTo: 'home',
      }, */,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

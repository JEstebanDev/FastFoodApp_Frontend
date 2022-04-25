import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportComponent } from './pages/report/report.component';
import { GraficsComponent } from './pages/grafics/grafics.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminbodyComponent } from './adminbody/adminbody.component';
import { SearchComponent } from './components/search/search.component';
import { HomeProductsDetailsComponent } from './components/home-products-details/home-products-details.component';
import { HomeSideOrderComponent } from './components/home-side-order/home-side-order.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    ReportComponent,
    GraficsComponent,
    SettingsComponent,
    SidebarComponent,
    AdminbodyComponent,
    SearchComponent,
    HomeProductsDetailsComponent,
    HomeSideOrderComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}

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
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdditionalComponent } from './pages/additional/additional.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdditionalCardComponent } from './components/additional-card/additional-card.component';
import { ProductSideComponent } from './components/product-side/product-side.component';
import { AdditionalSideComponent } from './components/additional-side/additional-side.component';

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
    ProductsCardComponent,
    AdditionalComponent,
    CategoryComponent,
    AdditionalCardComponent,
    ProductSideComponent,
    AdditionalSideComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}

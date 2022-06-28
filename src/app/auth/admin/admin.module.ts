import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { BillComponent } from './pages/bill/bill.component';
import { GraficsComponent } from './pages/grafics/grafics.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminbodyComponent } from './adminbody/adminbody.component';
import { SearchComponent } from './components/search/search.component';
import { OrderSideComponent } from './components/order-side/order-side.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdditionalComponent } from './pages/additional/additional.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdditionalCardComponent } from './components/additional-card/additional-card.component';
import { ProductSideComponent } from './components/product-side/product-side.component';
import { AdditionalSideComponent } from './components/additional-side/additional-side.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategorySideComponent } from './components/category-side/category-side.component';
import { BillCardComponent } from './components/bill-card/bill-card.component';
import { BillModalComponent } from './components/bill-modal/bill-modal.component';
import { UserComponent } from './pages/user/user.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserSideComponent } from './components/user-side/user-side.component';
import { FilenamePipe } from './pipes/filename.pipe';
import { StatusBillPipe } from './pipes/status-bill.pipe';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraficPieComponent } from './components/grafic-pie/grafic-pie.component';
import { GraficBarStyleTwoComponent } from './components/grafic-bar-style-two/grafic-bar-style-two.component';
import { GraficBarStyleOneComponent } from './components/grafic-bar-style-one/grafic-bar-style-one.component';
import { GraficClientComponent } from './components/grafic-client/grafic-client.component';
import { GraficSideComponent } from './components/grafic-side/grafic-side.component';
import { OrderModalComponent } from './components/order-modal/order-modal.component';
import { SuggestInputSearchComponent } from './components/suggest-input-search/suggest-input-search.component';
import { OrderInfoResponsiveComponent } from './components/order-info-responsive/order-info-responsive.component';
import { SideBarTabletComponent } from './components/side-bar-tablet/side-bar-tablet.component';
@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    BillComponent,
    GraficsComponent,
    SettingsComponent,
    SidebarComponent,
    AdminbodyComponent,
    SearchComponent,
    OrderSideComponent,
    OrderInfoComponent,
    ProductsCardComponent,
    AdditionalComponent,
    CategoryComponent,
    AdditionalCardComponent,
    ProductSideComponent,
    AdditionalSideComponent,
    CategoryCardComponent,
    CategorySideComponent,
    BillCardComponent,
    BillModalComponent,
    UserComponent,
    UserCardComponent,
    UserSideComponent,
    FilenamePipe,
    StatusBillPipe,
    GraficPieComponent,
    GraficBarStyleTwoComponent,
    GraficBarStyleOneComponent,
    GraficClientComponent,
    GraficSideComponent,
    OrderModalComponent,
    SuggestInputSearchComponent,
    OrderInfoResponsiveComponent,
    SideBarTabletComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class AdminModule {}

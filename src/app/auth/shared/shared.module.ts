import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { SharedRoutingModule } from './shared-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ButtonPrevDirective } from './directives/button-prev.directive';
import { ButtonNextDirective } from './directives/button-next.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardBuyComponent } from './components/product-card-buy/product-card-buy.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardModalComponent } from './components/product-card-modal/product-card-modal.component';
import { OrderComponent } from './pages/order/order.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderItemMobileComponent } from './components/order-item-mobile/order-item-mobile.component';
import { CreateAccountModalComponent } from './components/create-account-modal/create-account-modal.component';
import { BillInfoComponent } from './pages/bill-info/bill-info.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { FilenamePipe } from './pipes/filename.pipe';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    LoginComponent,
    ProductCardBuyComponent,
    ProductCardModalComponent,
    SignupComponent,
    LoginFormComponent,
    SignupFormComponent,
    ButtonPrevDirective,
    ButtonNextDirective,
    NavbarComponent,
    AboutUsComponent,
    ContactComponent,
    FooterComponent,
    NavigationBarComponent,
    HeaderComponent,
    OrderComponent,
    CheckoutComponent,
    ProfileComponent,
    OrderItemComponent,
    OrderItemMobileComponent,
    CreateAccountModalComponent,
    BillInfoComponent,
    ProfileFormComponent,
    FilenamePipe,
    RecoverPasswordComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedRoutingModule,
  ],
  exports: [HomeComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { SharedRoutingModule } from './shared-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { CardHomeComponent } from './components/card-home/card-home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    LoginComponent,
    CardHomeComponent,
    SignupComponent,
    LoginFormComponent,
    SignupFormComponent,
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

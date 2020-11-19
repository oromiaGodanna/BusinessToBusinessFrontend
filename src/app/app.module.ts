import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgZorroAntdModule, } from 'ng-zorro-antd';
import {Ng2TelInputModule} from 'ng2-tel-input';


import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';
import { AppHttpService } from './services/app-http.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { UpdateProfileComponent } from './my-account/update-profile/update-profile.component';
import { ViewProfileComponent } from './my-account/view-profile/view-profile.component';
import { ChangeEmailComponent } from './my-account/change-email/change-email.component';
import { ChangePasswordComponent } from './my-account/change-password/change-password.component';
import { TasksComponent } from './help/tasks/tasks.component';
import { SubscriptionModelsComponent } from './subscription-models/subscription-models.component';
import { SubscriptionFormComponent } from './subscription-models/subscription-form/subscription-form.component';
import { DeleteAccountComponent } from './my-account/delete-account/delete-account.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HelpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UpdateProfileComponent,
    ViewProfileComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    MyAccountComponent,
    TasksComponent,
    SubscriptionModelsComponent,
    SubscriptionFormComponent,
    DeleteAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    Ng2TelInputModule
  ],
  exports: [RouterModule],
  providers: [AppHttpService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

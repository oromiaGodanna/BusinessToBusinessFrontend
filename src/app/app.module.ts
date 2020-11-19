import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import {Ng2TelInputModule} from 'ng2-tel-input';
import { NgZorroAntdModule, } from 'ng-zorro-antd';


import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { PromotionComponent } from './promotion/promotion.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { NewNotificationComponent } from './new-notification/new-notification.component';
import { NewSmsComponent } from './new-sms/new-sms.component';

// mercy's
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
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

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzBadgeModule } from 'ng-zorro-antd/badge';


import {ScrollingModule} from '@angular/cdk/scrolling';
import { NotificationService } from './services/notification.service';
import { PromotionService } from './services/promotion.service';
import { MessageService } from './services/message.service';
import { ChangeBackgroundDirective } from './directives/change-background.directive';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SocketService } from './services/socket.service';





registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessageComponent,
    NotificationComponent,
    PromotionComponent,
    MessageBubbleComponent,
    EmailFormComponent,
    NewNotificationComponent,
    NewSmsComponent,
    ChangeBackgroundDirective,
    LoginComponent,
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
    HttpClientModule,
    BrowserAnimationsModule,


    ReactiveFormsModule,
    NgZorroAntdModule,
    Ng2TelInputModule,

    // ant design components
    NzMenuModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzGridModule,
    NzLayoutModule,
    NzDividerModule,
    NzDropDownModule,
    NzSpaceModule,
    NzListModule,
    NzAvatarModule,
    ScrollingModule,
    NzFormModule,
    NzSkeletonModule,
    NzCardModule,
    NzTabsModule,
    NzRadioModule,
    NzBadgeModule

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    SocketService,
    MessageService,
    NotificationService,
    PromotionService,
    AppHttpService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule { }

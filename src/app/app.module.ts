import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { PromotionComponent } from './promotion/promotion.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { NewNotificationComponent } from './new-notification/new-notification.component';
import { NewSmsComponent } from './new-sms/new-sms.component';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

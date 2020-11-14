import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { PromotionComponent } from './promotion/promotion.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { NewNotificationComponent } from './new-notification/new-notification.component';
import { NewSmsComponent } from './new-sms/new-sms.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'message', component: MessageComponent},
  { path: 'notification', component: NotificationComponent},
  
  { path: 'promotion/email', component: EmailFormComponent},
  { path: 'promotion/email/:id', component: EmailFormComponent},

  { path: 'promotion/notification', component: NewNotificationComponent},
  { path: 'promotion/sms', component: NewSmsComponent},
  { path: 'promotion', component: PromotionComponent},

  { path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

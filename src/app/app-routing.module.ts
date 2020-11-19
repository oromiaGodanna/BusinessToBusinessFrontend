import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewProfileComponent } from './my-account/view-profile/view-profile.component';
import { UpdateProfileComponent } from './my-account/update-profile/update-profile.component';
import { ChangeEmailComponent } from './my-account/change-email/change-email.component';
import { ChangePasswordComponent } from './my-account/change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HelpComponent } from './help/help.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { TasksComponent } from './help/tasks/tasks.component';
import { SubscriptionModelsComponent } from './subscription-models/subscription-models.component';
import { SubscriptionFormComponent } from './subscription-models/subscription-form/subscription-form.component';
import { AuthGuard } from './services/auth-guard.service';
import { RoleGuard } from './services/role-guard.service';
import { DeleteAccountComponent } from './my-account/delete-account/delete-account.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'email_confirmation/:token', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  {
    path: 'my_account',  component: MyAccountComponent, canActivate: [AuthGuard], children: [
      { path: ':id/view', component: ViewProfileComponent },
      { path: ':id/update', component: UpdateProfileComponent },
      { path: ':id/change_email', component: ChangeEmailComponent },
      { path: ':id/change_password', component: ChangePasswordComponent },
      { path: ':id/deactivate', component: DeleteAccountComponent}
    ]
  },
  { path: 'help', component: HelpComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'forgot_password', component: ForgotPasswordComponent },
  { path: 'reset_password/:token', component: ResetPasswordComponent },
  { path: 'subscription', component: SubscriptionModelsComponent },
  { path: 'subscription_forms', canActivate : [AuthGuard, RoleGuard], component: SubscriptionFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

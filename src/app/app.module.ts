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
// import { NgZorroAntdModule, } from 'ng-zorro-antd';


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

//jerry's

import { ProductsComponent } from './products/products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductsService } from './services/products.service';
import { WishlistService } from './services/wishlist.service';
import { CategoryService } from './services/category.service';
import { SpecialofferService } from './services/specialoffer.service';
import { ProformaService } from './services/proforma.service';
import { CartService } from './services/cart.service';
import { ResponseService } from './services/response.service';
import { MeasurementsService } from './services/measurements.service';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SpecialofferListComponent } from './specialoffer-list/specialoffer-list.component';
import { ActiveSpecialOfferComponent } from './active-special-offer/active-special-offer.component';
import { PendingSpecialOfferComponent } from './pending-special-offer/pending-special-offer.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { IndexComponent } from './index/index.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { ProductBySubCategoryComponent } from './product-by-sub-category/product-by-sub-category.component';
import { SpecialOfferByCategoryComponent } from './special-offer-by-category/special-offer-by-category.component';
import { SpecialOfferBySubCategoryComponent } from './special-offer-by-sub-category/special-offer-by-sub-category.component';
import { SpecialOfferProductComponent } from './special-offer-product/special-offer-product.component';
import { RequestProformaComponent } from './request-proforma/request-proforma.component';
import { PendingProformaComponent } from './pending-proforma/pending-proforma.component';
import { ClosedProformaComponent } from './closed-proforma/closed-proforma.component';
import { ViewProformaComponent } from './view-proforma/view-proforma.component';
import { OpenedProformaComponent } from './opened-proforma/opened-proforma.component';
import { ViewResponsesComponent } from './view-responses/view-responses.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { FilterProductComponent } from './filter-product/filter-product.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AddProductComponent } from './add-product/add-product.component';

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
import { NzCarouselModule } from 'ng-zorro-antd/Carousel';


import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { NzTableModule } from 'ng-zorro-antd/table';


import {ScrollingModule} from '@angular/cdk/scrolling';
import { NotificationService } from './services/notification.service';
import { PromotionService } from './services/promotion.service';
import { MessageService } from './services/message.service';
import { ChangeBackgroundDirective } from './directives/change-background.directive';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SocketService } from './services/socket.service';



import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { MenubarComponent } from './menubar/menubar.component';


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
    ProductsComponent,
    WishlistComponent,
    ProductComponent,
    CartComponent,
    AddProductComponent,
    ProductListComponent,
    EditProductComponent,
    SpecialofferListComponent,
    ActiveSpecialOfferComponent,
    PendingSpecialOfferComponent,
    IndexComponent,
    AddCategoryComponent,
    CategoriesComponent,
    EditCategoryComponent,
    AlertsComponent,
    ProductByCategoryComponent,
    ProductBySubCategoryComponent,
    SpecialOfferByCategoryComponent,
    SpecialOfferBySubCategoryComponent,
    SpecialOfferProductComponent,
    RequestProformaComponent,
    PendingProformaComponent,
    ClosedProformaComponent,
    ViewProformaComponent,
    OpenedProformaComponent,
    ViewResponsesComponent,
    SearchProductComponent,
    FilterProductComponent,
    MeasurementsComponent,
    AddMeasurementComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,


    ReactiveFormsModule,
    // NgZorroAntdModule,
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
    NzBadgeModule,
    NzPageHeaderModule,
    NzAlertModule,
    NzStepsModule,
    NzResultModule,
    NzBackTopModule,
    NzDescriptionsModule,
    NzBreadCrumbModule,
    NzModalModule,
    NzCollapseModule,
    NzRateModule,
    NzEmptyModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzCarouselModule,
    NzCardModule,
    NzGridModule,
    NzSpaceModule,
    NzIconModule,
    NzTabsModule,
    NzTypographyModule,
    NzNotificationModule,
    NzFormModule,
    NzSelectModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzUploadModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzMessageModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzDropDownModule,
    NzSpinModule,
    NzResultModule,
    NzAvatarModule,
    NzCommentModule,
    NzBadgeModule,
    NzMenuModule,

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

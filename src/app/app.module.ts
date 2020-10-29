import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { PaymentComponent } from './payment/payment.component';
import { PaymentService } from './payment.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrdersComponent } from './orders/orders.component';
import { FeedbackDisplaysComponent } from './feedback-displays/feedback-displays.component';
import { DisputesComponent } from './disputes/disputes.component';
import { NewDisputeComponent } from './new-dispute/new-dispute.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    FeedbackComponent,
    PlaceOrderComponent,
    OrdersComponent,
    FeedbackDisplaysComponent,
    DisputesComponent,
    NewDisputeComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, PaymentService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

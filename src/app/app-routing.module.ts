import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisputesComponent } from './disputes/disputes.component';
import { FeedbackDisplaysComponent } from './feedback-displays/feedback-displays.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NewDisputeComponent } from './new-dispute/new-dispute.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  { path: 'disputes-component', component: DisputesComponent },
  { path: 'feedback-component', component: FeedbackComponent },
  { path: 'feedbackDisplays-component', component: FeedbackDisplaysComponent },
  { path: 'newDispute-component', component: NewDisputeComponent },
  { path: 'orders-component', component: OrdersComponent },
  { path: 'payment-component', component: PaymentComponent },
  { path: 'placeOrder-component', component: PlaceOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

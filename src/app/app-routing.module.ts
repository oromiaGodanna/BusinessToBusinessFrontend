import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisputesComponent } from './disputes/disputes.component';
import { FeedbackDisplaysComponent } from './feedback-displays/feedback-displays.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NewDisputeComponent } from './new-dispute/new-dispute.component';
import { OrderDetailsSupplierComponent } from './order-details-supplier/order-details-supplier.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  { path: '',   redirectTo: '/place-order', pathMatch: 'full' },
  { path: 'disputes', component: DisputesComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'feedback-displays', component: FeedbackDisplaysComponent },
  { path: 'new-dispute', component: NewDisputeComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'place-order', component: PlaceOrderComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'order-details-supplier', component: OrderDetailsSupplierComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

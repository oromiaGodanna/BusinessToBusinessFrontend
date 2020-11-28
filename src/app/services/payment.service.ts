import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  uri = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  addPayment(): any{
    console.log('I have come here');
    const payment = {
      orderId: '5f41723d755bb73e7774037e',
      amountPaid: 200.00,
      buyerStripeId: '5f41723d755bb73e7774037e',
      sellerStripeId: '5f41723d755bb73e7774037e',
      stripeObject: {}
    };
    return this.http.post<any>(`${this.uri}/payment/createPayment/`, payment).subscribe({
      next: data => console.log(data),
      error: error => console.error('There was an error!', error)
  });
  }
}

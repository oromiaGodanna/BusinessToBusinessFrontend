import { Injectable } from '@angular/core';
import { Subscription } from '../models/subscription.model';
import { AppHttpService } from './app-http.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  serverUrl = 'http://localhost:3000';

  constructor(private http: AppHttpService) { }

  getSubscriptions() {
    const url = `${this.serverUrl}/subscription`;
    return this.http.get(url);
  }

  createSubscription(subscription: Subscription) {
    const url = `${this.serverUrl}/subscription/create`;
    return this.http.post(url, subscription);
  }

  deleteSubscription(id){
    const url = `${this.serverUrl}/subscription`;
    return this.http.delete(url, id);
  }

}

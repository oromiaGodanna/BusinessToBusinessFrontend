import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AppHttpService } from '../services/app-http.service';

import {SubscriptionService} from '../services/subscription.service';

@Component({
  selector: 'app-subscription-models',
  templateUrl: './subscription-models.component.html',
  styleUrls: ['./subscription-models.component.css']
})
export class SubscriptionModelsComponent implements OnInit {

  constructor(
    private subscriptionService: SubscriptionService,
    private http: AppHttpService,
    private router: Router,
    private message: NzMessageService) { }
 
plans=[];
  // plans = [
  //   {
  //     name: 'Basic',
  //     price: 0,
  //     description: 'Become a member for free.',
  //     rate: 0,
  //     numOfProducts: 10,
  //     numOfQuatations: 10,
  //     numOfEmails: 10
  //   },
  //   {
  //     name: 'Silver',
  //     price: 9.99,
  //     description: 'Be able to send promotional messages',
  //     rate: 1,
  //     numOfProducts: 50,
  //     numOfQuatations: 50,
  //     numOfEmails: 50
  //   },
  //   {
  //     name: 'Gold',
  //     price: 14.99,
  //     description: 'Find what your are looking for',
  //     rate: 2,
  //     numOfProducts: 100,
  //     numOfQuatations: 100,
  //     numOfEmails: 100
  //   },
  //   {
  //     name: 'Platinum',
  //     price: 19.99,
  //     description: 'Find what your are looking for',
  //     rate: 3,
  //     numOfProducts: 120,
  //     numOfQuatations: 120,
  //     numOfEmails: 120
  //   },
  // ];

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      (response: any)=>{
        if (response.status == 200) {
          this.plans = response.subscriptions;
          console.log(this.plans);
        }
    },(error) => {
      this.message.error('failed to retrive list of subscriptions availble');
      //console.log('error', error)
    });
  }

  helpCenter(){
    this.router.navigate(['help']);
  }
}

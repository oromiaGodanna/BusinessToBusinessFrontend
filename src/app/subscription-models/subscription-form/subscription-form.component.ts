import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AppHttpService } from 'src/app/services/app-http.service';

import { Subscription } from '../../models/subscription.model';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  subscriptionForm: FormGroup;
  error: boolean = false;
  errMsg: string;
  plans = [];

  subscription = {
    name: String,
    description: String,
    monthlyPrice: Number,
    numOfProducts: Number,
    numOfQuatations: Number,
    numOfEmails: Number,
    availableOn: Boolean || Date,
  }

  constructor(
    private subscriptionService: SubscriptionService,
    private http: AppHttpService,
    private router: Router,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.plans = response.subscriptions;
        }
      }, (error: HttpErrorResponse) => {
        this.message.error('failed to retrive list of subscriptions availble');
        this.error = true;
        this.errMsg = error.error;
      });

    this.subscriptionForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      monthlyPrice: new FormControl(null, [Validators.required]),
      numOfProducts: new FormControl(null, [Validators.required]),
      numOfQuatations: new FormControl(null, [Validators.required]),
      numOfEmails: new FormControl(null, [Validators.required]),
      // availableOn : new FormControl(null, [Validators.required])
    });
  }
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

  deleteSubscription(i: any) {
    console.log(this.plans[i]._id);
    this.subscriptionService.deleteSubscription(this.plans[i]._id).subscribe(
      (response: any) => {
        if(response.status == 200){
          this.message.success('Subscription Successfully Deleted');
          this.ngOnInit();
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.error= true;
        this.errMsg = error.error;
        this.message.error('Could not delete the subscription');
    });
  }

  onSubmit() {
  const subscription = new Subscription(
    this.subscriptionForm.get('name').value,
    this.subscriptionForm.get('description').value,
    this.subscriptionForm.get('monthlyPrice').value,
    this.subscriptionForm.get('numOfProducts').value,
    this.subscriptionForm.get('numOfQuatations').value,
    this.subscriptionForm.get('numOfEmails').value,
  );
   //console.log(this.subscription);
   this.subscriptionService.createSubscription(subscription).subscribe(
      (response: any) => {
        this.message.success('Subscription Successfully Created');
        this.subscriptionForm.reset();
        this.ngOnInit();
      },(error) => {
        this.error = true;
        this.errMsg = error.error;
        this.message.error('Failed to Create the subscription');
      })

  }
  cancel(): void {
    this.message.info('Deletion Canceled');
  }

}

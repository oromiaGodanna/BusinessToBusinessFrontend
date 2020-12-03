import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  addressForm: FormGroup;
  agreementForm: FormGroup;
  loading = false;
  next = false;
  link = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
  newOrder : Order;
  registeredNewOrder: any;
  orderedItems: any; cart: any;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private orderService: OrderService) {
    this.addressForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress1: ['', [Validators.required]],
      companyAddress2: [''],
      city: ['', [Validators.required]],
      poBox: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      phoneNumber1: ['', [Validators.required, Validators.pattern('^((\\+251?)|0)?[0-9]{10}$')] ],
      phoneNumber2: ['', Validators.pattern('^((\\+251?)|0)?[0-9]{10}$')],
    });
    this.agreementForm = this.fb.group({
      agree: [false, [Validators.required]]
    });

  }

  onNext(value: any): void{
    this.newOrder.shippingAddress = value;
    //set other features of new order
    this.next = true;
  }
  onSubmit(value: any): void{

    this.orderService.createOrder(this.newOrder).
    subscribe(data => {
         console.log(data);
         this.registeredNewOrder = data;
         console.log(this.registeredNewOrder._id);
         this.router.navigate(['/order-details', {id: this.registeredNewOrder._id}]);

       }), catchError( error => {
         return throwError( 'Something went wrong!' );
       });
  }

  ngOnInit(): void {
    this.orderedItems = this.orderService.getEachCartItems("");
    this.cart = this.orderService.getCartById("");
    this.newOrder = {
      buyerId: "",
      sellerId: "",
      cartEntryId: "",
      totalAmount: 20.0,
      totalPrice: 122.02,
      shippingAddress:{},
      status: "Waiting for confirmation",
      paymentIds: []
    }
    this.newOrder.cartEntryId = "5c0a7922c9d89830f4911426";
    this.newOrder.buyerId = "5c0a7922c9d89830f4911426";
    this.newOrder.sellerId = "5c0a7922c9d89830f4911426";
  }

}

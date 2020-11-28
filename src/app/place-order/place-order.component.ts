import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  addressForm: FormGroup;
  agreementForm: FormGroup;
  orderAddress: any;
  loading = false;
  next = false;
  link = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
  newOrder = {
    buyerId: "",
    sellerId: "",
    cartEntryId: [],
    numberOfItems: 0,
    totalPrice: 0,
    shippingAddress: {
      addressline1: ""
    },
    status: "Waiting for confirmation",
    paymentIds: []
  };
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
    this.next = true;
  }
  onSubmit(value: any): void{
    console.log('I have been clicked.', value);

    this.orderService.createOrder(this.newOrder).
    subscribe(data => {
         console.log(data);
         this.registeredNewOrder = data;
         console.log(this.newOrder);
       }), catchError( error => {
         return throwError( 'Something went wrong!' );
       });
    this.router.navigate(['/order-details', {id: this.registeredNewOrder._id}]);
  }

  ngOnInit(): void {
    this.orderedItems = this.orderService.getEachCartItems("");
    this.cart = this.orderService.getCartById("");
  }

}

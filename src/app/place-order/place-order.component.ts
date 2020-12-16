import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { ProductsService } from '../services/products.service'
import { CartService } from '../services/cart.service';

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
  link = "https://..com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
  newOrder : Order;
  registeredNewOrder: any;
  orderedItems: [any]; cart: any; currentUser;
  tax; total;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private cartService: CartService, private orderService: OrderService,
    private userService: UserService, private productService: ProductsService) {
    this.addressForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress1: ['', [Validators.required]],
      companyAddress2: [''],
      city: ['', [Validators.required]],
      poBox: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      phoneNumber1: ['', [Validators.required, Validators.pattern('^((\\+251?)|0)?[0-9]{9}$')] ],
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
    console.log('submitting');
    console.log(this.newOrder)
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
   this.currentUser =  this.userService.getUserData();
  //  this.currentUser = this.currentUser._id;
  //  console.log(this.currentUser);
  this.newOrder = {
    buyerId: "",
    sellerId: "",
    cartEntryId: [],
    totalAmount: 20.0,
    totalPrice: 122.02,
    shippingAddress:{},
    status: "Waiting for confirmation",
    paymentIds: []
  }
    this.orderedItems = this.orderService.getEachCartItems("");
    this.cart = this.orderService.getCartById("");
    this.cartService.getCart().
    subscribe(data => {
        this.cart = data;
        for(let element of data){
          this.newOrder.cartEntryId.push(element['cartEntries']._id);
          this.newOrder.totalAmount = this.newOrder.totalAmount + element['cartEntries'].amount;
          this.newOrder.totalPrice = this.newOrder.totalPrice  + element['price'];
          this.newOrder.sellerId = element['userId'];
        }
        console.log(this.newOrder.cartEntryId)
        console.log(data);
       }), catchError( error => {
         return throwError( 'Something went wrong!' );
       });
        
    // this.newOrder.cartEntryId = "5c0a7922c9d89830f4911426";
    this.newOrder.buyerId = this.currentUser._id;
    this.tax = (this.newOrder.totalPrice as any * 0.15).toFixed(2);;
    this.total = (this.tax + this.newOrder.totalPrice as any).toFixed(2);;

  }

}

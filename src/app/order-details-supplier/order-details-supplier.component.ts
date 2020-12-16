import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order-details-supplier',
  templateUrl: './order-details-supplier.component.html',
  styleUrls: ['./order-details-supplier.component.css']
})
export class OrderDetailsSupplierComponent implements OnInit {
  // @ViewChild('Waiting_for_confirmation') Waiting_for_confirmation:TemplateRef<any>;
  // @ViewChild('Order_canceled') Order_canceled:TemplateRef<any>; 
  // @ViewChild('Order_Declined') Order_Declined:TemplateRef<any>;
  // @ViewChild('Waiting_for_payment') Waiting_for_payment:TemplateRef<any>; 
  // @ViewChild('Waiting_for_shipment') Waiting_for_shipment:TemplateRef<any>;
  // @ViewChild('Waiting_for_delivery_confirmation') Waiting_for_delivery_confirmation:TemplateRef<any>;
  // @ViewChild('Delivered') Delivered:TemplateRef<any>;
  // @ViewChild('Completed') Completed:TemplateRef<any>; 
  
  index = 0;
  orderId: string; status : string;
  currentOrder: any;
  order: any; listOfData: any; sellerUser: any;
  subTotal = 1;
  id: any;
  message: any;
  constructor(private route: ActivatedRoute, private orderService: OrderService, private cartService: CartService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      if (!this.orderId) {
        // this.orderId = this.userService.getUserData()._id;

      }
    });
    this.orderService.getOrder(this.orderId).
      subscribe(data => {
        console.log(data);
        this.currentOrder = data.order;
        this.status = this.currentOrder.status;
        console.log(this.currentOrder)
        this.getCurrentSeller(this.currentOrder.sellerId);
        console.log(this.currentOrder.shippingAddress)
      }), catchError(error => {
        return throwError('Something went wrong!');
      });
    console.log(this.currentOrder)

    this.cartService.getCart().
      subscribe(data => {
        this.listOfData = data;
        for (let element of this.listOfData) {
          this.subTotal = this.subTotal + (element['price'] * element.additionalProductInfo[2]);

        }
        console.log(this.listOfData)
      }), catchError(error => {
        return throwError('Something went wrong!');
      });




  }
  getCurrentSeller(sellerId) {
    this.userService.getUserProfile(sellerId).subscribe(
      (response: any) => {
        this.sellerUser = response.user;
        console.log(this.sellerUser)
      }, (error: HttpErrorResponse) => {
        this.message.error('Something Happend while trying to retrive the Users Profile.');
      }
    );
  }
  onIndexChange(event: number): void {
    this.index = event;
  }
  acceptOrder(){
    this.orderService.acceptOrder(this.orderId).
    subscribe(data => {
      console.log(data);
      window.location.reload();

    }, (error: HttpErrorResponse) => {
      this.message.error('Something Happend while trying to retrive the Users Profile.');
    }
  );
  }

  declineOrder(){
    this.orderService.declineOrder(this.orderId).
    subscribe(data => {
      console.log(data);
      window.location.reload();
    }, (error: HttpErrorResponse) => {
      this.message.error('Something Happend while trying to retrive the Users Profile.');
    }
  );

  }

}

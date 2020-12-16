import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { UserService } from '../services/user.service'
import { OrderService } from '../services/order.service'
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  date = null;
  size: NzButtonSize = 'small';
  PaginationIntValue = 0; PaginationEndValue = 2;
  currentUser;
  orders = [{
    itemImage: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    orderNumber: "ORD256987456",
    placedDate: "Aug 26, 2020",
    totalPrice:  256.25,
    name: "Jane Doe",
    shipmentType: "Express",
    expectedShipmentDate: "Sept. 23, 2020",
    deliveredOn: "",
    status: "Waiting for shipment"
  },
  {
    itemImage: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    orderNumber: "ORD256987456",
    placedDate: "Aug 26, 2020",
    totalPrice:  256.25,
    name: "Jane Doe",
    shipmentType: "none",
    expectedShipmentDate: "",
    deliveredOn: "",
    status: "Waiting for buyer to pickup"
  },
  {
    itemImage: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    orderNumber: "ORD256987456",
    placedDate: "Aug 26, 2020",
    totalPrice:  256.25,
    name: "Jane Doe",
    shipmentType: "Express",
    expectedShipmentDate: "Sept. 23, 2020",
    deliveredOn: "",
    status: "Waiting for shipment"
  }];
  constructor(private userService: UserService, private orderService: OrderService) { }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
  onPageIndexChange($event): void {
    const pageSize = 2;
    // tslint:disable-next-line:comment-format
    //do something here to go to next page
    this.PaginationIntValue = $event * pageSize - pageSize;
    this.PaginationEndValue = $event * pageSize;
    console.log($event);
    }
    checkUser(){
      

    }
  ngOnInit(): void {
    this.currentUser =  this.userService.getUserData();
      //  this.currentUser = this.currentUser.;
       console.log(this.currentUser);
       
       if (this.currentUser.userType == "Buyer"){
        this.orders = this.orderService.getBuyerOrders(this.currentUser._id).subscribe(data => {
          console.log(data);
          this.orders = data;
         }), catchError( error => {
           return throwError( 'Something went wrong!' );
         });
       }else if(this.currentUser.type == "Seller" || "Both"){
        this.orderService.getSupplierOrders(this.currentUser._id).subscribe(data => {
          console.log(data);
          this.orders = data;
         }), catchError( error => {
           return throwError( 'Something went wrong!' );
         });
      
        console.log(this.orders);

       }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details-supplier',
  templateUrl: './order-details-supplier.component.html',
  styleUrls: ['./order-details-supplier.component.css']
})
export class OrderDetailsSupplierComponent implements OnInit {
  index = 0;
  orderId: string;
  currentOrder;
  order = {
    status: "waiting_for_confiramation"
  };
  listOfData = [
    {
      name: 'Long sleeve cardigen',
      amount: 2,
      price: 32.25,
      
    },
    {
      name: 'Long sleeve cardigen',
      amount: 2,
      price: 32.25,
      
    },
    {
      name: 'Long sleeve cardigen',
      amount: 2,
      price: 32.25,
      
    }
  ];
id: any;
constructor(private route: ActivatedRoute, private orderService: OrderService) { }

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.orderId= params.get('id');
  });
  this.orderService.getOrder(this.orderId).
  subscribe(data => {
       console.log(data);
       this.currentOrder = data.order;
     }), catchError( error => {
       return throwError( 'Something went wrong!' );
     });

}
onIndexChange(event: number): void {
  this.index = event;
}
changeOrderStatus(status: string, orderId: string): any{

}
}

import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  date = null;
  size: NzButtonSize = 'small';
  PaginationIntValue = 0; PaginationEndValue = 2;
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
  constructor() { }

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
  ngOnInit(): void {
  }

}

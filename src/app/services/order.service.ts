import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  uri = 'http://localhost:3000';
  sampleCart = [
    {
      productId: "",
      amount: 0,
      price: 22.0
    },
    {
      productId: "",
      amount: 0,
      price: 22.0
    },
    {
      productId: "",
      amount: 0,
      price: 22.0
    }];

  constructor(private http: HttpClient) { }


  createOrder(newOrder): any{
    console.log('I have come here', newOrder);
    return this.http.post<any>(`${this.uri}/order/createOrder`, newOrder);
  }

  getOrder(orderId): any{
    return this.http.get<any>(`${this.uri}/order/getOrder/${orderId}`);
  }

  getBuyerOrders(buyerId): any{
    return this.http.get<any>(`${this.uri}/order/getBuyerOrders/${buyerId}`);
  }

  getSupplierOrders(sellerId): any{
    return this.http.get<any>(`${this.uri}/order/getSupplierOrders/${sellerId}`);
  }

  acceptOrder(orderId): any{
    return this.http.put<any>(`${this.uri}/order/acceptOrder/${orderId}`, {});

  }

  declineOrder(orderId): any{
    return this.http.put<any>(`${this.uri}/order/declineOrder/${orderId}`, {});

  }
  cancelOrder(orderId): any{
    return this.http.put<any>(`${this.uri}/order/cancelOrder/${orderId}`, {});

  }
  changePaymentStatus(orderId): any{
    return this.http.put<any>(`${this.uri}/order/changePaymentStatus/${orderId}`, {});

  }
  changeShipmentStatus(orderId): any{
    return this.http.put<any>(`${this.uri}/order/changeShipmentStatus/${orderId}`, {});

  }
  changeDeliveryStatus(orderId): any{
    return this.http.put<any>(`${this.uri}/order/changeDeliveryStatus/${orderId}`, {});

  }
  orderDelivered(orderId): any{
    return this.http.put<any>(`${this.uri}/order/orderDelivered/${orderId}`, {});

  }
  closeOrderReceipt(orderId): any{
    return this.http.put<any>(`${this.uri}/order/closeOrderReceipt/${orderId}`, {});

  }

  //simulation of getting cart and cartitems
  getCartById(cartId): any{
    return this.sampleCart;
  }
  getProductById(productId): any{
    return {
      productID: "",
      productName: "Product Name" + (Math.floor(Math.random() * (1 - 9) + 1)),
      price: 20.00,
      description: "lorum ipsum lorum ipsum ipsum"
    };
  }
  getEachCartItems(cartId): any{
    // tslint:disable-next-line:prefer-const
    let items = [];
    const cart = this.getCartById(cartId);
    cart.forEach(element => {
     // tslint:disable-next-line:prefer-const
     let item = this.getProductById(element.productId);
     items.push(item);
    });
    return items;
  }

}

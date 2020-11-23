import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getCart(): Observable<Cart[]>{
    return this.http.get<Cart[]>('http://localhost:3000/cart/getCart');
  }
  
  addToCart(cart){
    //alert(wishlist.productIds);
   return this.http.post('http://localhost:3000/cart/addToCart', cart);
   
  }

  removeFromCart(productId){
    return this.http.delete('http://localhost:3000/cart/removeFromCart/'+productId);
  }

  countCart(){
    return this.http.get('http://localhost:3000/cart/countProductInCart/');
  }

}

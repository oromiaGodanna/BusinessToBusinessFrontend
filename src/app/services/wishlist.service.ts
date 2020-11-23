import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wishlist } from '../models/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  getWishlist(): Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>('http://localhost:3000/wishlist/getWishList');
  }
  
  addToWishList(wishlist:Wishlist){
    //alert(wishlist.productIds);
   return this.http.post('http://localhost:3000/wishlist/addToWishList', wishlist);
   
  }

  removeFromWishlist(productId){
    return this.http.delete('http://localhost:3000/wishlist/removeFromWishList/'+productId);
  }

  countWishlist(){
    return this.http.get('http://localhost:3000/wishlist/countProductInWishlist/');
  }
  
}

import { Component, OnInit,Inject } from '@angular/core';
import { Wishlist } from '../models/wishlist';
import { HttpClient } from '@angular/common/http';
import { WishlistService } from '../services/wishlist.service';
import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { SpecialofferService } from '../services/specialoffer.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.sass']
})
export class WishlistComponent implements OnInit { 

  constructor(private http:HttpClient,private wishlistService:WishlistService,
    private router: Router,private iconService: NzIconService,private specialofferService:SpecialofferService,
    private notification: NzNotificationService,private userService:UserService,private i18n: NzI18nService) { }

  wishlist=[];
  wishlistObj;
  wishlistModel:Wishlist;
  isEnglish = false;
  result;
  specialOffer;
  productDiscount;
  productinWishlistNum;
  token={
    _id:"11111111"
  };

    ngOnInit(): void {
     // this.token = this.userService.getToken();

      if(this.token._id != null){

        this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
        this.isEnglish = !this.isEnglish;
        this.wishlistService.getWishlist().subscribe(res => {
        this.wishlist = res;

        this.wishlist.forEach(element => {
          //var x= document.getElementById('isModalVisible'+element._id).style.display = 'none';
            if(element.specialOfferId != null){
  
              this.specialofferService.getSpecialOfferProduct(element._id).subscribe(res => {
                this.specialOffer= res[0]['specialOffer'];
                this.productDiscount = this.specialOffer.discount;
                element.discount=this.productDiscount;
              });
            } 
          });

        });
      }else{
        this.router.navigate(['/products']);
      }
    }
    
   /*addToWishList(wishlist:Wishlist) {
    this.wishlistService.addToWishList(wishlist).subscribe();
    return true;
  }*/

  removeProductFromWishlist(productId){
    if(this.token._id != null){
      var divId = document.getElementById(productId).style.display = 'none';
      this.wishlistService.removeFromWishlist(productId).subscribe();
      return true;
    }
  }

  addProductToWishlist(productId){
    if(this.token._id != null){

      
      this.wishlistObj = {
        productIds:[productId]  
      
      };
      this.wishlistService.addToWishList(this.wishlistObj).subscribe(res => {
        this.result = res;
        if(this.result.success == true && this.result.type==true ){
          //return this.createNotification('success');
          this.notification.create(
            'success',
            'Product Added To WishList',
            ''
          );
        }else if(this.result.success == true && this.result.type==false ){
          //return this.createNotification('info');
          this.notification.create(
              'info',
              'Product Already In WishList',
              ''
          );
        }else{
          //return this.createNotification('error');
          this.notification.create(
            'error',
            'Failed to add product to wishlist.Try Again',
            ''
          );
        }
      })
    }else{
      this.notification.create(
        'error',
        'You must login First!!',
        ''
      );
    }
  }

  countProductInWishlist(){
   
    if(this.token._id != null){
      this.wishlistService.countWishlist().subscribe(res => {
        this.productinWishlistNum = Number(res);
      });
    }else{
      this.productinWishlistNum = 0;
    }
  }

  
}

import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { SpecialofferService } from '../services/specialoffer.service';
import { Product } from '../models/product';
import { SpecialOffer } from '../models/SpecialOffer';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconService } from 'ng-zorro-antd/icon';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { CategoryService } from '../services/category.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {CartComponent} from '../cart/cart.component';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-specialoffer-list',
  templateUrl: './specialoffer-list.component.html',
  styleUrls: ['./specialoffer-list.component.sass']
})
export class SpecialofferListComponent implements OnInit {

  constructor(private http:HttpClient,private productService:ProductsService,private cartService:CartService,
    private specialofferService:SpecialofferService,private wishlistService:WishlistService,private userService:UserService,private iconService: NzIconService,private message: NzMessageService,private notification: NzNotificationService,
    private router: Router,private fb: FormBuilder, private categoryService:CategoryService,private modal: NzModalService,private i18n: NzI18nService) { }

  products: Product[];
  isVisible = false;
  setTimeVisible = false;
  openButton = true;
  form: FormGroup;
  specialOffers=[];
  moreSpecialOffers=[];
  offset=0;
  limit=12;
  initialCountProducts=1;
  countProducts=1;
  productId;
  specialOfferId;
  date = null; 
  isEnglish = false;
  activeSpecialOffer;
  categories;

  ngOnInit(): void {
    this.getSpecialOffers();
    this.getCategories();
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
   
  }

  getSpecialOffers(): void {
    this.specialofferService.getActiveSpecialOffers(this.offset,this.limit).subscribe(res => {
      this.specialOffers = res; 
      this.initialCountProducts = this.specialOffers.length;
       this.moreSpecialOffers = [];
    });
  }
  getCategories(): void {
    
    this.categoryService.getCategories().subscribe(res => {
    //  console.log(res);
     this.categories = res;
    });
  }
  createMessage(type: string): void {
    this.message.create(type, `Special Offer opened Successfully!!!`);
    var divId = document.getElementById(this.specialOfferId).style.display = 'none';
  }

  addProductToWishlist(productId){
    
    let wishlistObj = new WishlistComponent(this.http,this.wishlistService,
    this.router,this.iconService,this.specialofferService,this.notification,this.userService,this.i18n);
    wishlistObj.addProductToWishlist(productId);

  }

  
  addToCart(productId){
      let cartComponent = new CartComponent(this.http,this.cartService,
      this.modal,this.specialofferService,this.i18n,this.userService,this.notification,this.router);
      cartComponent.addToCart(productId);
  }
  orderProduct(id){

  }

  searchForProduct(){
    var searchWord =  (<HTMLInputElement>document.getElementById("searchWord")).value;
    this.router.navigate(['/searchForProduct', searchWord]);
  }

  loadMoreSpecialOffers(){

        this.offset = this.offset+this.limit;
        this.specialofferService.getActiveSpecialOffers(this.offset,this.limit).subscribe(res => {

          for (let i = 0; i < res.length; i++) {
            this.moreSpecialOffers.push(res[i]);
          }
          
          this.countProducts = res.length;
      });
     
  }
  
}

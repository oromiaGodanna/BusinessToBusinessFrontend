import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { WishlistService } from '../services/wishlist.service';
import { SpecialofferService } from '../services/specialoffer.service';
import { CartService } from '../services/cart.service';
import { Wishlist } from '../models/wishlist';
import { ProductComponent } from '../product/product.component';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {CartComponent} from '../cart/cart.component';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

 
    
  
  constructor(private http:HttpClient,private productService:ProductsService,
    private categoryService:CategoryService,private specialofferService:SpecialofferService,
    private wishlistService:WishlistService,private cartService:CartService,private userService:UserService,
    private router: Router,private iconService: NzIconService,private modal: NzModalService,
    private notification: NzNotificationService,private i18n: NzI18nService){ 
      this.iconService.fetchFromIconfont({
        scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
      })
    }

  ngOnInit() {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
    this.getProducts();
    this.getCategories();
    this.getSpecialOffers();
  
  }
  array = [1, 2, 3, 4];
  products: Product[];
  categories: Category[];
  wishlist:Wishlist;
  result;
  cart;
  isEnglish = false;
  specialOffers;
  offset=0;
  limit=12;
  getProducts(): void {
    
        this.productService.getProducts(this.offset,this.limit).subscribe(res => {
        //  console.log(res);
         this.products = res;
        });
  }

  getSpecialOffers(): void {
    this.specialofferService.getActiveSpecialOffers(this.offset,this.limit).subscribe(res => {
      this.specialOffers = res; 
    });
  }

  getCategories(): void {
    
        this.categoryService.getCategories().subscribe(res => {
        //  console.log(res);
         this.categories = res;
        });
  }

  addProductToWishlist(productId){
    
    let wishlistObj = new WishlistComponent(this.http,this.wishlistService,
    this.router,this.iconService,this.specialofferService,this.notification,this.userService,this.i18n);
    wishlistObj.addProductToWishlist(productId);

  }

  goToProductDetails(_id) {
    this.router.navigate(['/product', _id]);
  }

  addProductToCart(productId){

   
    let cartComponent = new CartComponent(this.http,this.cartService,
    this.modal,this.specialofferService,this.i18n,this.userService,this.notification,this.router);
    cartComponent.addToCart(productId);

  }

  orderProduct(productId){

  }

  searchForProduct(){
    var searchWord =  (<HTMLInputElement>document.getElementById("searchWord")).value;
    this.router.navigate(['/searchForProduct', searchWord]);
  }

}

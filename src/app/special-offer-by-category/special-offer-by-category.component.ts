import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { SpecialofferService } from '../services/specialoffer.service';
import { WishlistService } from '../services/wishlist.service';
import { Product } from '../models/product';
import { SpecialOffer } from '../models/SpecialOffer';
import { Router,ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-special-offer-by-category',
  templateUrl: './special-offer-by-category.component.html',
  styleUrls: ['./special-offer-by-category.component.sass']
})
export class SpecialOfferByCategoryComponent implements OnInit {

  constructor(private http:HttpClient,private route:ActivatedRoute,private productService:ProductsService,private cartService:CartService,
    private specialofferService:SpecialofferService,private wishlistService:WishlistService,private iconService: NzIconService,private message: NzMessageService,private notification: NzNotificationService,
    private router: Router,private fb: FormBuilder, private categoryService:CategoryService,private modal: NzModalService,private i18n: NzI18nService) { }

    productCategory;
    productSubCategory;
    relatedProducts=[];
    moreRelatedProducts=[];
    offset=0;
    limit=1;
    initialCountProducts=1;
    countProducts=1;
    categories;

  ngOnInit(): void {
    this.getSpecialOffers();
    this.getCategories();
   
  }

  getSpecialOffers(): void {
    this.route.paramMap.subscribe(params => {
      var productCategory = params.get('category');
      this.productCategory = productCategory;
      this.specialofferService.getActiveSpecialOffersByProductCategory(productCategory,this.offset,this.limit).subscribe(res => {
        this.relatedProducts = res;
        this.initialCountProducts = this.relatedProducts.length;
         this.moreRelatedProducts = [];
      });

    });

    this.getCategories();
   
  }

  getCategories(): void {
    
    this.categoryService.getCategories().subscribe(res => {
    //  console.log(res);
     this.categories = res;
    });
  }
 
  
  addProductToCart(productId){
     let cartComponent = new CartComponent(this.http,this.cartService,
      this.modal,this.specialofferService,this.i18n,this.notification,this.router);
      cartComponent.addToCart(productId);
  }

   addProductToWishlist(productId){
    
    let wishlistObj = new WishlistComponent(this.http,this.wishlistService,
    this.router,this.iconService,this.specialofferService,this.notification,this.i18n);
    wishlistObj.addProductToWishlist(productId);

  }

  searchForProduct(){
    var searchWord =  (<HTMLInputElement>document.getElementById("searchWord")).value;
    this.router.navigate(['/searchForProduct', searchWord]);
  }

  loadMoreRelatedSpecialOffers(){

    this.offset = this.offset+this.limit;
    this.specialofferService.getActiveSpecialOffersByProductCategory(this.productCategory,this.offset,this.limit).subscribe(res => {

      for (let i = 0; i < res.length; i++) {
        this.moreRelatedProducts.push(res[i]);
      }
      
      this.countProducts = res.length;
  });
 
}

}


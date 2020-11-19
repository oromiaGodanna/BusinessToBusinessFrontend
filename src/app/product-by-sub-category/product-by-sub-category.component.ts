import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { CategoryService } from '../services/category.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { SpecialofferService } from '../services/specialoffer.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ObjectUnsubscribedError } from 'rxjs';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {CartComponent} from '../cart/cart.component';

@Component({
  selector: 'app-product-by-sub-category',
  templateUrl: './product-by-sub-category.component.html',
  styleUrls: ['./product-by-sub-category.component.sass']
})
export class ProductBySubCategoryComponent implements OnInit {

  constructor(private http:HttpClient,private productService:ProductsService,private cartService:CartService, private route: ActivatedRoute,
    private iconService: NzIconService,private wishlistService:WishlistService,private modal: NzModalService,
    private router: Router, private categoryService:CategoryService,private specialofferService:SpecialofferService,
    private notification: NzNotificationService,private i18n: NzI18nService) { }

    productCategory;
    productSubCategory;
    relatedProducts=[];
    categories;
    isEnglish = false;
    moreRelatedProducts=[];
    countInitialProducts=1;
    countMoreProducts=1;
    offset=0;
    limit=2;

  ngOnInit(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
    this.route.paramMap.subscribe(params => {
      var productSubCategory = params.get('subCategory');
      this.productSubCategory = productSubCategory;
      this.productService.getRelatedProductBySubCategory(productSubCategory,this.offset,this.limit).subscribe(res => {
        this.relatedProducts = res;
        this.moreRelatedProducts = [];
        this.countInitialProducts = res.length;
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

  loadMoreRelatedProductsBySubCategory(){

    this.offset = this.offset+this.limit;
     
    this.productService.getRelatedProductBySubCategory(this.productSubCategory,this.offset,this.limit).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.moreRelatedProducts.push(res[i]);
      }
      
      this.countMoreProducts = res.length;
      });
    
}

}


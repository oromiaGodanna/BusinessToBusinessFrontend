import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { CategoryService } from '../services/category.service';
import { WishlistService } from '../services/wishlist.service';
import { SpecialofferService } from '../services/specialoffer.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ActivatedRoute } from '@angular/router';
import { ObjectUnsubscribedError } from 'rxjs';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {CartComponent} from '../cart/cart.component';
import {UserService } from '../services/user.service';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.sass']
})
export class SearchProductComponent implements OnInit {

  constructor(private http:HttpClient,private productService:ProductsService, private route: ActivatedRoute,
    private iconService: NzIconService,private wishlistService:WishlistService,private cartService:CartService,
    private router: Router, private categoryService:CategoryService,private modal: NzModalService,
    private specialofferService:SpecialofferService,private userService:UserService,
    private notification: NzNotificationService,private i18n: NzI18nService) { }

    productCategory;
    productSubCategory;
    searchWord = "Under All Category";
    relatedProducts=[];
    moreRelatedProducts=[];
    countInitialProducts=1;
    countMoreProducts=1;
    categories;
    isEnglish = false;
    offset=0;
    limit=12;

  ngOnInit(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
    this.route.paramMap.subscribe(params => {
      if(params.get('searchWord')){
        var searchWord = params.get('searchWord');
        this.searchWord = searchWord;
        this.productService.searchProduct(searchWord,this.offset,this.limit).subscribe(res => {
          this.relatedProducts = res;
          this.moreRelatedProducts = [];
          this.countInitialProducts = res.length;
        });
      }else{
        this.productService.getProducts(this.offset,this.limit).subscribe(res => {
          this.relatedProducts = res;
          this.moreRelatedProducts = [];
          this.countInitialProducts = res.length;
        });
      }
     
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
      this.modal,this.specialofferService,this.i18n,this.userService,this.notification,this.router);
      cartComponent.addToCart(productId);
  }

  addProductToWishlist(productId){
    
    let wishlistObj = new WishlistComponent(this.http,this.wishlistService,
    this.router,this.iconService,this.specialofferService,this.notification,this.userService,this.i18n);
    wishlistObj.addProductToWishlist(productId);

  }

  searchForProduct(){
    var searchWord =  (<HTMLInputElement>document.getElementById("searchWord")).value;
    this.router.navigate(['/searchForProduct', searchWord]);
  }

  
  loadMoreSearchProducts(){

    this.offset = this.offset+this.limit;
     
    this.productService.searchProduct(this.searchWord,this.offset,this.limit).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.moreRelatedProducts.push(res[i]);
      }
      
      this.countMoreProducts = res.length;
    });
    
}


}




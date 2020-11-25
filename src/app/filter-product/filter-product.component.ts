import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { SpecialofferService } from '../services/specialoffer.service';
import { Wishlist } from '../models/wishlist';
import { ProductComponent } from '../product/product.component';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {CartComponent} from '../cart/cart.component';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.sass']
})
export class FilterProductComponent implements OnInit {

  constructor(private http:HttpClient,private productService:ProductsService,private cartService:CartService,
    private categoryService:CategoryService,private fb: FormBuilder,private wishlistService:WishlistService,private modal: NzModalService,
    private offerService:SpecialofferService,private userService:UserService,
    private router: Router,private route: ActivatedRoute,private iconService: NzIconService,
    private notification: NzNotificationService,private specialofferService:SpecialofferService,private i18n: NzI18nService) { }

    ngOnInit() {
      this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
      this.isEnglish = !this.isEnglish;
      this.getProducts();

    }
   
    products=[];
    categories: Category[];
    allSubCategories:String[]=[];
    isEnglish = false;
    productCategory;
    productSubCategory;
    maxPrice;
    specialOffer;
    productDiscount;
    offset=0;
    limit=12;
    moreProducts=[];
    countInitialProducts=1;
    countMoreProducts=1;
    filterObj;
    
    getProducts(): void {
      
      this.route.paramMap.subscribe(params => {
        this.productCategory = params.get('productCategory');
        this.productSubCategory = params.get('productSubCategory');
        this.maxPrice = params.get('maxPrice');

        this.filterObj={
          productCategory:this.productCategory,
          productSubCategory:this.productSubCategory,
          maxPrice:this.maxPrice
        };
        this.productService.filterProducts(this.filterObj,this.offset,this.limit).subscribe(res => {
         
            this.products = res;
            this.countInitialProducts = this.products.length;
            this.products.forEach(element => {
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
      });
    }
  
    addProductToWishlist(productId){
      
      let wishlistObj = new WishlistComponent(this.http,this.wishlistService,
      this.router,this.iconService,this.offerService,this.notification,this.userService,this.i18n);
      wishlistObj.addProductToWishlist(productId);
  
    }
  
    goToProductDetails(_id) {
      this.router.navigate(['/product', _id]);
    }
  
    addProductToCart(productId){
  
     
      let cartComponent = new CartComponent(this.http,this.cartService,
      this.modal,this.offerService,this.i18n,this.userService,this.notification,this.router);
      cartComponent.addToCart(productId);
  
    }
  
   
     
  loadMoreFilteredProducts(){

    this.offset = this.offset+this.limit;
     
    this.productService.filterProducts(this.filterObj,this.offset,this.limit).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.moreProducts.push(res[i]);
      }
      
      this.countMoreProducts = res.length;
    });
    
}

    
  }
  

import { asNativeElements, Component, OnInit,SecurityContext} from '@angular/core';
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
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {CartComponent} from '../cart/cart.component';
import { DomSanitizer } from '@angular/platform-browser';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  

    
  
  constructor(private http:HttpClient,private productService:ProductsService,private cartService:CartService,
    private categoryService:CategoryService,private fb: FormBuilder,private wishlistService:WishlistService,private modal: NzModalService,
    private offerService:SpecialofferService,
    private router: Router,private iconService: NzIconService,
    private notification: NzNotificationService,private i18n: NzI18nService,private userService:UserService,private sanit:DomSanitizer){ 
      this.form = this.fb.group({
        productCategory: [null, [Validators.required]],
        productSubCategory: [null, [Validators.required]],
        price: [null, [Validators.required]]
      })
    }

  ngOnInit() {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
    this.getProducts();
    this.getCategories();
   
    
  }
  
  products: Product[];
  categories: Category[];
  allSubCategories:String[]=[];
  wishlist:Wishlist;
  cart;
  result; 
  isEnglish = false;
  form: FormGroup;
  offset=0;
  limit=12;
  moreProducts:Product[];
  counterI=0;
  initialCountProducts=1;
  countProducts=1;
  

  getProducts(): void {
        
        this.productService.getProducts(this.offset,this.limit).subscribe(res => {
        //  console.log(res);
         this.products = res;
         this.initialCountProducts = this.products.length;
        // this.countProducts = this.products.length;
         this.moreProducts = [];
        });
  }

  getCategories(): void {
    
        this.categoryService.getCategories().subscribe(res => {
        //  console.log(res);
         this.categories = res;
         for  (var i =  0; i <  this.categories.length; i++)  {
          for  (var j =  0; j <  this.categories[i]['subCategories'].length; j++)  {
           // this.subCategories=this.categories[i]['subCategories'];
           this.allSubCategories.push(this.categories[i]['subCategories'][j]);
          }
        }

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

 

  filterSearch(){
    var validationStatus = true;

    for (const i in this.form.controls) {
     
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
      
      if( this.form.controls[i].invalid){
       validationStatus = false;
      }
    }

    if(validationStatus ==true){

      var productCategory = this.form.get('productCategory').value;
      var productSubCategory = this.form.get('productSubCategory').value;
      var productPrice = this.form.get('price').value;

      this.router.navigate(['/filterProducts/'+productCategory+'/'+productSubCategory+'/'+productPrice]);

    }
  }

  alertLoginNotification(){
    this.notification.create(
      'error',
      'You must login First!!',
      ''
    );
  }
  
  loadMoreProducts(){

    /*
      var contentsOne = document.getElementById("products").innerHTML;
      this.offset = this.offset+this.limit;
      this.productService.getProducts(this.offset,this.limit).subscribe(res => {
      //  console.log(res);
      this.moreProducts = res;
      this.countProducts = this.moreProducts.length;

    });
     var contentsTwo=document.getElementById("moreProducts").innerHTML;
     document.getElementById("products").innerHTML = contentsOne + contentsTwo;
    */
        this.offset = this.offset+this.limit;
        this.productService.getProducts(this.offset,this.limit).subscribe(res => {

          for (let i = 0; i < res.length; i++) {
            this.moreProducts.push(res[i]);
          }
          
          this.countProducts = res.length;
      });
      this.counterI=this.counterI + 1;  
      
  }

  openFilter(){
    document.getElementById('filterSideBar').style.display="inline";
  }

  
}


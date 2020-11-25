import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { SpecialofferService } from '../services/specialoffer.service';
import { ActivatedRoute } from '@angular/router';
import { ObjectUnsubscribedError } from 'rxjs';
import { Router } from '@angular/router';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {CartComponent} from '../cart/cart.component';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  constructor(private http:HttpClient,private productService:ProductsService,private cartService:CartService, private route: ActivatedRoute,
    private iconService: NzIconService,private wishlistService:WishlistService,private modal: NzModalService,
    private specialofferService:SpecialofferService,
    private router: Router,private notification: NzNotificationService,private i18n: NzI18nService,private userService:UserService) { 
      
    }

     
  form: FormGroup;
  product;
  images;
  title;
  productName;
  productImage;
  productCategory;
  offset=0;
  limit=4;
  relatedProducts=[];
  color;
  size;
  sizeInNumber;
  isEnglish = false;
  cartProductId;
  showCartModal;
  cartEntryModal=false;
  selectedColor;
  selectedSize;
  selectedSizeInNumber;
  minOrder;
  colorArray;
  sizeArray;
  sizeInNumberArray;
  countRelatedProducts;
  fb = new FormBuilder();

  ngOnInit(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
    this.route.paramMap.subscribe(params => {
      var _id = params.get('id');
      this.productService.getProduct(_id).subscribe(res => {
        this.product= res;
        this.productName = res['name'];
        this.cartProductId = res['_id'];
        this.images=res['images'];
        this.productImage =res['images'][0];
        this.productCategory =res['productCategory'];
       // var colorProduct =res['additionalInfo']['color'];
        this.color =res['additionalProductInfo'][0];
        this.colorArray = this.color.split(',');
        this.size =res['additionalProductInfo'][1];
        this.sizeArray = this.size.split(',');
        this.sizeInNumber =res['additionalProductInfo'][2];
        this.sizeInNumberArray = this.sizeInNumber.split(',');
        this.minOrder= res['minOrder'];

        this.form =  this.fb.group({
          selectedAmount: [null, [Validators.required]],
        });
        
        if(this.color  != null && this.color  != "" ){
          this.form.addControl("selectedColor", new FormControl(null, Validators.required));
        }

        if(this.size != null && this.size  != ""){
          this.form.addControl("selectedSize", new FormControl(null, Validators.required));
        }

        if(this.sizeInNumber != null && this.sizeInNumber  != ""){
          this.form.addControl("selectedSizeInNumber", new FormControl(null, Validators.required));
        }

       
        this.productService.getRelatedProductByCategory(this.productCategory,this.offset,this.limit).subscribe(res => {
          this.relatedProducts = res;
          this.countRelatedProducts = res.length;
          });

      });

        
    });

   
  }

  changeImage(id){
    this.productImage =this.images[id];
  }

  addProductToCart(productId){
   this.cartEntryModal=true;
}

  /*addProductToCart(productId){
      let cartComponent = new CartComponent(this.http,this.cartService,
      this.modal,this.specialofferService,this.i18n,this.notification,this.router);
      cartComponent.addToCart(productId);
  }*/
  addProductToWishlist(productId){
    
    let wishlistObj = new WishlistComponent(this.http,this.wishlistService,
    this.router,this.iconService,this.specialofferService,this.notification,this.userService,this.i18n);
    wishlistObj.addProductToWishlist(productId);

  }

  alertLoginNotification(){
    this.notification.create(
      'error',
      'You must login First!!',
      ''
    );
  }

 

  handleCancel(): void {
    this.cartEntryModal = false;
  }

  addToCart(){

    var formData: any = new FormData();
    var validationStatus = true;

    for (const i in this.form.controls) {
     
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
      
      if( this.form.controls[i].invalid){
       validationStatus = false;
      }
    }

    if(validationStatus ==true){
      this.cartEntryModal=false;
      var additionalInfos =[];
      if(this.color  != null && this.color  != ""){
        additionalInfos.push((this.form.get('selectedColor').value).toString());
      }else{
        additionalInfos.push("");
      }

      if(this.size  != null && this.size  != ""){
        additionalInfos.push((this.form.get('selectedSize').value).toString());
      }else{
        additionalInfos.push("");
      }

      if(this.sizeInNumber  != null && this.sizeInNumber  != ""){

        additionalInfos.push((this.form.get('selectedSizeInNumber').value).toString());
      }else{
        additionalInfos.push("");
      }
      
      var cartObj ={
          productId:this.cartProductId,
          amount:this.form.get('selectedAmount').value,
          additionalInfo:additionalInfos,
         
      };
     // alert("yes");
      let cartComponent = new CartComponent(this.http,this.cartService,
        this.modal,this.specialofferService,this.i18n,this.userService,this.notification,this.router);
        cartComponent.addToCart(cartObj);
    }

 }

 changeQuantity(minOrder){
  
  var val = this.form.get('selectedAmount').value;
  
  if(val=='' || parseInt(val) < minOrder){
    val=minOrder;
    this.form.get('selectedAmount').setValue = minOrder;
  }

 }

}

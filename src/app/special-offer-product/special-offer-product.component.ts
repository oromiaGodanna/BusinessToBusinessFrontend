import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { SpecialofferService } from '../services/specialoffer.service';
import { WishlistService } from '../services/wishlist.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ObjectUnsubscribedError } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzIconService } from 'ng-zorro-antd/icon';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {CartComponent} from '../cart/cart.component';
import {WishlistComponent} from '../wishlist/wishlist.component';

@Component({
  selector: 'app-special-offer-product',
  templateUrl: './special-offer-product.component.html',
  styleUrls: ['./special-offer-product.component.sass']
})
export class SpecialOfferProductComponent implements OnInit {

  constructor(private http:HttpClient,private productService:ProductsService, private route: ActivatedRoute, private router: Router,private cartService:CartService,
    private iconService: NzIconService,private wishlistService:WishlistService, private specialofferService:SpecialofferService,
    private modal: NzModalService,private notification: NzNotificationService,private i18n: NzI18nService) { }
    
    form: FormGroup;
    product;
    productCategory;
    relatedProducts=[];
    productImage;
    images;
    specialOffer; 
    isEnglish = false;
    offset=0;
    limit=12;
    color;
    size;
    sizeInNumber;
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
      this.route.paramMap.subscribe(params => {
        var _id = params.get('id');
        this.specialofferService.getSpecialOfferProduct(_id).subscribe(res => {
          this.product= res[0]['product'];
          this.specialOffer= res[0]['specialOffer'];
          this.images= res[0]['product']['images'];
          this.productImage =res[0]['product']['images'][0];
          this.productCategory =res[0]['product']['productCategory'];
          this.cartProductId = res[0]['product']['_id'];
        this.color =res[0]['product']['additionalProductInfo'][0];
        this.colorArray = this.color.split(',');
        this.size =res[0]['product']['additionalProductInfo'][1];
        this.sizeArray = this.size.split(',');
        this.sizeInNumber =res[0]['product']['additionalProductInfo'][2];
        this.sizeInNumberArray = this.sizeInNumber.split(',');
        this.minOrder= res[0]['product']['minOrder'];

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
         
          this.specialofferService.getActiveSpecialOffersByProductCategory(this.productCategory,this.offset,this.limit).subscribe(res => {
            this.relatedProducts = res;
            this.countRelatedProducts = res.length;
            });
  
        });
      });
      this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
      this.isEnglish = !this.isEnglish;
     
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
      this.router,this.iconService,this.specialofferService,this.notification,this.i18n);
      wishlistObj.addProductToWishlist(productId);
  
    }

    searchForProduct(){
      var searchWord =  (<HTMLInputElement>document.getElementById("searchWord")).value;
      this.router.navigate(['/searchForProduct', searchWord]);
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
          this.modal,this.specialofferService,this.i18n,this.notification,this.router);
          cartComponent.addToCart(cartObj);
      }
  
   }
    
  }
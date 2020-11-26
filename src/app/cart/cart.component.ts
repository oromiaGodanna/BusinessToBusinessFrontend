import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import {UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SpecialofferService } from '../services/specialoffer.service';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  

  constructor(private http:HttpClient,private cartService:CartService,private modal: NzModalService,
     private specialofferService:SpecialofferService,private i18n: NzI18nService,private userService:UserService,
     private notification: NzNotificationService,private router: Router) { }

  cart=[];
  isVisible: false;
  productDiscount;
  specialOffer;
  isEnglish = false;
  countProduct;
  result; 
  subTotalPrice=0;
  taxVal = 0;
  shippmentVal=0;
  totalVal=0;
  cartTotalVal=0;
  productinCartNum;
  cartProductId;
  showCartModal;
  cartEntryModal=false;
  token={
    _id:"11111111",
  };
  
 
    ngOnInit(): void {
      //this.token = this.userService.getToken();

      if(this.token._id != null){

        this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
        this.isEnglish = !this.isEnglish;
        this.cartService.getCart().subscribe(res => {
          this.cart = res;
          if((this.cart).length > 0){
            this.countProduct =this.cart.length;

            this.cart.forEach(element => {
            //var x= document.getElementById('isModalVisible'+element._id).style.display = 'none';
                if(element.specialOfferId != null){

                  this.specialofferService.getSpecialOfferProduct(element._id).subscribe(res => {
                    this.specialOffer= res[0]['specialOffer'];
                    this.productDiscount = this.specialOffer.discount;
                    element.discount=Number(this.productDiscount);
                   this.subTotalPrice = this.subTotalPrice + ( this.specialOffer.discount * element.minOrder);
                  });
                } 
            });

            //

            for (let i = 0; i < this.cart.length; i++) {
              if(this.cart[i].specialOfferId == null){
                this.subTotalPrice = this.subTotalPrice + ( this.cart[i].price * this.cart[i].minOrder);
              }
            }

             /* var tax=parseFloat((this.subTotalPrice*0.05).toFixed(3));
              //var taxValue = this.subTotalPrice;
              //var tax = (taxValue)*0.02;
              var shippment=parseFloat((this.subTotalPrice*0.02).toFixed(3));
              var totalPrice=(this.subTotalPrice+tax+shippment).toFixed(3);
              this.taxVal = tax;
              this.shippmentVal = shippment;
              this.cartTotalVal = Number(totalPrice);*/
            
          }
        });
      }else{
       this.router.navigate(['/products']);
      }
    }

    addToCart(cartObj) {
      if(this.token._id != null){
          var cart = {
            productId:cartObj.productId,
            amount:cartObj.amount,  
            additionalInfo:cartObj.additionalInfo, 
          };
          this.cartService.addToCart(cart).subscribe(res => {
            this.result = res;
            if(this.result.success == true && this.result.type==true ){
              //return this.createNotification('success');
              this.notification.create(
                'success',
                'Product Added To Cart',
                ''
              );
            }else if(this.result.success == true && this.result.type==false ){
              //return this.createNotification('info');
              this.notification.create(
                  'info',
                  'Product Already In Cart',
                  ''
              );
            }else{
              //return this.createNotification('error');
              this.notification.create(
                'error',
                'Failed to add product to Cart.Try Again',
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


  removeProductFromCart(productId){
    if(this.token._id != null){
      var subTotAfter = parseFloat((document.getElementById("subTotal"+productId).innerHTML));
      var divId = document.getElementById(productId).style.display = 'none';
      
      document.getElementById("subTotal"+productId).innerHTML=(0).toString();
      var subTotInitial =  parseFloat(document.getElementById("cartSubtotal").innerHTML);
      //console.log("Initial "+subTotInitial);
      //console.log("After "+subTotAfter);
      var subTotV = subTotInitial-subTotAfter;
      console.log(subTotV);
      var tax=parseFloat((subTotV*0.05).toFixed(3));
      var shippment=parseFloat((subTotV*0.02).toFixed(3));
      var totalPrice=(subTotV+tax+shippment).toFixed(3);
      document.getElementById("cartSubtotal").innerHTML=(subTotV).toString();
      document.getElementById("cartTax").innerHTML=(tax).toString();
      document.getElementById("cartShipping").innerHTML=(shippment).toString();
      document.getElementById("cartTotal").innerHTML=(totalPrice).toString();
      this.cartService.removeFromCart(productId).subscribe();
    }
  }

  
  showDetailsModal(productId){
    document.getElementById('isModalVisible'+productId).style.display = 'inline';
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  changeSubTotal(productId,productPrice,minOrder){
    var subTot = 0;
    var val =  (<HTMLInputElement>document.getElementById("inputQuantity"+productId)).value;
    if(val=='' || parseInt(val) < minOrder){
      val=minOrder;
      (<HTMLInputElement>document.getElementById("inputQuantity"+productId)).value=minOrder;
    }
    var valNumber=parseInt(val);
    //console.log(valNumber);
    document.getElementById("subTotal"+productId).innerHTML=(valNumber*productPrice).toString();
    //console.log("code inner html is  " +document.getElementById("subTotal"+productId).innerHTML);
    for (let i = 0; i < this.cart.length; i++) {
      var productSubTotal =parseFloat((document.getElementById("subTotal"+this.cart[i]._id).innerHTML));
      subTot = subTot + productSubTotal;
    }
   
    var tax=parseFloat((subTot*0.05).toFixed(3));
    var shippment=parseFloat((subTot*0.02).toFixed(3));
    var totalPrice=(subTot+tax+shippment).toFixed(3);
    document.getElementById("cartSubtotal").innerHTML=(subTot).toString();
    document.getElementById("cartTax").innerHTML=(tax).toString();
    document.getElementById("cartShipping").innerHTML=(shippment).toString();
    document.getElementById("cartTotal").innerHTML=(totalPrice).toString();
  }

  countProductIncart(){
    if(this.token._id != null){
      this.cartService.countCart().subscribe(res => {
        this.productinCartNum = Number(res);
      });
    }else{
      this.productinCartNum = 0;
    }
  }

 

}

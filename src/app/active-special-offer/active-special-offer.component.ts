import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { SpecialofferService } from '../services/specialoffer.service';
import {UserService } from '../services/user.service';
import { Product } from '../models/product';
import { SpecialOffer } from '../models/specialOffer';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-active-special-offer',
  templateUrl: './active-special-offer.component.html',
  styleUrls: ['./active-special-offer.component.sass']
})
export class ActiveSpecialOfferComponent implements OnInit {

  constructor(private http:HttpClient,private productService:ProductsService,
    private specialofferService:SpecialofferService,private userService:UserService,private message: NzMessageService,
    private router: Router,private fb: FormBuilder,private modal: NzModalService,private i18n: NzI18nService) { }

  products: Product[];
  isVisible = false;
  setTimeVisible = false;
  openButton = true;
  form: FormGroup;
  specialOffers;
  productId;
  specialOfferId;
  date = null; 
  isEnglish = false;
  activeSpecialOffer;
  imageToView;
  showImage;
  token;
  loggedInStatus=this.userService.isLoggedIn();
  userDataa=this.userService.getUserData();

  ngOnInit(): void {
    //this.token = this.userService.getToken();
    if (this.loggedInStatus) {
      if(this.userDataa.userType == 'Seller' || this.userDataa.userType == 'Both'){
        this.getActiveSpecialOffers();
        this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
        this.isEnglish = !this.isEnglish;
      }else{
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }

  }

  getActiveSpecialOffers(): void {
    
    this.specialofferService.getMyActiveSpecialOffer().subscribe(res => {
       this.specialOffers = res;
    });
    
  }

  closeSpecialOfferModal(specialOfferId,productId): void {
    this.specialOfferId = specialOfferId;
    this.productId = productId;
    this.modal.confirm({
      nzTitle: 'Are you sure you want to close the specialoffer?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.openSpecialOffer(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteSpecialOfferModal(specialOfferId,productId): void {
    this.specialOfferId = specialOfferId;
    this.productId = productId;
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete the specialoffer from the product?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteSpecialOffer(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteProductModal(specialOfferId,productId): void {
    this.specialOfferId = specialOfferId;
    this.productId = productId;
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete the product?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteProduct(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  openSpecialOffer(){
    var specialOfferObj ={
      "productId":this.productId,
    };   
    this.specialofferService.openSpecialOffer(this.specialOfferId,specialOfferObj).subscribe(res => {
      this.createMessage('success','Special Offer opened Successfully!!!');
     console.log(res);
    });
  }

  createMessage(type: string,message): void {
    this.message.create(type, message);
    var divId = document.getElementById(this.specialOfferId).style.display = 'none';
  }
  
  deleteSpecialOffer(){
    if(this.userDataa.userType == 'Seller' || this.userDataa.userType == 'Both'){
      
      this.specialofferService.deleteSpecialOffer(this.productId).subscribe(res => {
        this.createMessage('success','Special Offer from the product is successfully deleted!!!');
       console.log(res);
      });
    }
   

  }

  deleteProduct(){
    if (this.loggedInStatus) {
      if(this.userDataa.userType == 'Seller' || this.userDataa.userType == 'Both'){
        this.specialofferService.deleteProduct(this.productId).subscribe(res => {
          this.createMessage('success','product deleted successfully');
          console.log(res);
        });
      }
      
    } else {
      this.router.navigate(['/login']);
    }
  }

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  viewImage(image){
    this.imageToView = image;
    this.showImage = true;
  }
  handleImageCancel(): void {
    this.showImage = false;
  }

  /*setTime(){
    this.setTimeVisible = true;
    this.openButton = false;
  }

  
   resetForm(): void {
    this.form.reset();
  }


  handleCancel(): void {
    this.openSpecialOfferModal = false;
  }*/

  /*specialOfferModal(specialOfferId,productId){
    this.productId = productId;
    this.openSpecialOfferModal = true;
    this.specialOfferId = specialOfferId;
  }*/

 /* startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
   
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }*/

  
  
}

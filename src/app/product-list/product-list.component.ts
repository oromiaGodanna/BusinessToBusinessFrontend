import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { SpecialofferService } from '../services/specialoffer.service';
import { Product } from '../models/product';
import { SpecialOffer } from '../models/specialOffer';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  constructor(private http:HttpClient,private productService:ProductsService,
    private specialofferService:SpecialofferService,
    private router: Router,private fb: FormBuilder,private userService:UserService,
    private modal: NzModalService,private message: NzMessageService,private i18n: NzI18nService) { 
    this.form = this.fb.group({
      description: [''],
      discountPrice: [null, [Validators.required]],
      startDate: [''],
      endDate: [''],
    })
  }

  products: Product[];
  isVisible = false;
  form: FormGroup;
  product :SpecialOffer;
  productId;
  isEnglish = false;
  showImage=false;
  imageToView;
  isSpinning = false;
  successMsg = "Product Is Successfully Uploaded As Special Offer!!!";
  failedMsg = "Failed To Update Product To Special Offer!!!";
  token;
  loggedInStatus=this.userService.isLoggedIn();
  userDataa=this.userService.getUserData();

  ngOnInit(): void {
    //this.token = this.userService.getToken();
    
    if(this.userDataa.userType != 'Admin' && this.userDataa.userType != 'Seller' && this.userDataa.userType != 'Both'){
      this.router.navigate(['/login']);
    }else{
      this.getProducts();
      this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
      this.isEnglish = !this.isEnglish;
    }
  
  }
 
  createMessage(type: string): void {
    this.message.create(type, `Product Successfully deleted!!!`);
  }

  getProducts(): void {
    if(this.userDataa.userType == 'Admin'){
      this.productService.getAllProducts().subscribe(res => {
      //  console.log(res);
        this.products = res;
      });
    }else{
      this.productService.getAllMyProducts(this.userDataa._id).subscribe(res => {
        //  console.log(res);
          this.products = res;
        });
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

  deleteProduct(productId):void{
    if(this.userDataa.userType != 'Admin' && this.userDataa.userType != 'Seller' && this.userDataa.userType != 'Both'){
      this.router.navigate(['/login']);
    }
    this.productService.removeProduct(productId).subscribe(res => {
       this.createMessage('success');
        var divId = document.getElementById(productId).style.display = 'none';
      
     });
    
  }

  showModal(productId): void {
    this.productId = productId;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  addSpecialOffer() {
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

      this.isSpinning = true;

      this.product = {
          "productId":this.productId,
          "title":this.form.get('description').value,
          "discount":this.form.get('discountPrice').value,
          "startDate":this.form.get('startDate').value,
          "endDate":this.form.get('endDate').value,
          };
      
      this.specialofferService.addSpecialOffer(this.product).subscribe(
        (response) => {
          
           // console.log(response)
            if(response['sucess'] == true){
              this.router.navigate(['/successMessage/success/'+this.successMsg+'/specialOffer']); // navigate to other page
            }else{
              var msg="Product Is Already On Pending For SpecialOffer!";
              this.router.navigate(['/successMessage/success/'+msg+'/specialOffer']); // navigate to other page
            }
            
          },
          (error) => {
            console.log(error)
            this.router.navigate(['/successMessage/error/'+this.failedMsg+'/specialOffer']); // navigate to other page
          }
      );

      }
  }
  resetForm(): void {
    this.form.reset();
  }
  

  showDeleteConfirm(productId): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this Product?',
      nzContent: '',
      nzCancelText: 'No',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteProduct(productId),
      nzOnCancel: () => console.log('Cancel')
    });
  }

  viewImage(image){
    this.imageToView = image;
    this.showImage = true;
  }
  handleImageCancel(): void {
    this.showImage = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ObjectUnsubscribedError } from 'rxjs';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { CategoryService } from '../services/category.service';
import { MeasurementsService } from '../services/measurements.service';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {

  constructor(private productService:ProductsService,private routee:Router,private userService:UserService,
    private categoryService:CategoryService,private measurementService:MeasurementsService, private route: ActivatedRoute,
    private fb: FormBuilder,private i18n: NzI18nService) {
    this.form = this.fb.group({
      productName: [null, [Validators.required]],
      description: [''],
      minOrder: [null, [Validators.required]],
      price: [null, [Validators.required]],
      keyword: [''],
      measurement: [''],
      color:[],
      size:[],
      sizeInNumber:[''],
      
    })
   }

    product;
    isCollapsed = false;
    form: FormGroup;
    keyword:string[]=[];
    keyW;
    images:string[]=[];
    color:string[]=[];
    size;
    categories;
    subCategories:string[]=[];
    productId;
    isSpinning = false;
    isEnglish = false;
    measurements;
    successMsg = "Product Is Successfully Edited!!!";
    failedMsg = "Failed To Edit Product!!!";
    token;
    loggedInStatus=this.userService.isLoggedIn();
    userDataa=this.userService.getUserData();

    ngOnInit(): void {
      //this.token = this.userService.getToken();
      if(this.userDataa.userType == 'Seller' || this.userDataa.userType == 'Both'){
       
        this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
        this.isEnglish = !this.isEnglish;

        this.route.paramMap.subscribe(params => {
          var _id = params.get('id');
          this.productId = _id;
          this.productService.getProduct(_id).subscribe(res => {
            this.product= res;
            //////
            if(this.product.userId == this.userDataa._id){
              this.getCategories();
              this.getMeasurements();
            }else{
              this.routee.navigate(['/login']);
            }
          });

        });
       
      }else{
        this.routee.navigate(['/login']);
      }

      
    }

    getCategories(): void {
    
      this.categoryService.getCategories().subscribe(res => {
      //  console.log(res);
      this.categories = res;
      for  (var i =  0; i <  this.categories.length; i++)  {
        for  (var j =  0; j <  this.categories[i]['subCategories'].length; j++)  {
         // this.subCategories=this.categories[i]['subCategories'];
         this.subCategories.push(this.categories[i]['subCategories'][j]);
        }
      }
     
      });
  }

  getMeasurements(): void {
    
    this.measurementService.getMeasurements().subscribe(res => {
      this.measurements = res;
    });
}


  submitForm() {
    const formData = new FormData();

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
     
      

      var choosenColor = this.form.get('color').value;
      var productColors=null;
      if(choosenColor != null){
        productColors = choosenColor.toString();
      }
      var choosenSize = this.form.get('size').value;
      var productSizes=null;
      if(choosenSize != null){
        productSizes = choosenSize.toString();
      } 

      var choosenSizeInNumber = this.form.get('sizeInNumber').value;
      var productSizeInNumber=null;
      if(choosenSizeInNumber != null){
        productSizeInNumber = choosenSizeInNumber.toString();
      } 

      this.keyW = this.form.get('keyword').value;
      if(this.keyW != null){
        if(this.keyW.indexOf(',') != -1){
          var keyw = this.keyW.split(',');
          for(var i=0;i<keyw.length;i++){
            this.keyword.push((keyw[i]).toString());
          }
        }else if(this.keyW != ""){
          this.keyword.push((this.form.get('keyword').value).toString());
        }
      }
    
      this.keyword.push(this.product.productName);
      this.keyword.push(this.product.productCategory);
     
      if(this.product.productSubCategory != null){
        this.keyword.push(this.product.productSubCategory);
      } 

      var productDescriptionForm = this.form.get('description').value;
      var productDescription=null;
      if(productDescriptionForm != null){
        productDescription = productDescriptionForm;
      } 
      
    var product = {
      "productName":this.product.productName,
      "productCategory":this.product.productCategory,
      "productSubCategory":this.product.productSubCategory,
      "description":productDescription,
      "images":this.product.images,
      "minOrder":this.form.get('minOrder').value,
      "price":this.form.get('price').value,
      "measurement":this.form.get('measurement').value,
      "keyword":this.keyword,
      "additionalProductInfo":[productColors,productSizes,productSizeInNumber],
    }

    this.productService.editProduct(this.productId,product).subscribe(
      (response) => {
         
        console.log(response)
        this.routee.navigate(['/successMessage/success/'+this.successMsg+'/product']); // navigate to other page
     },
     (error) => {
       console.log(error)
       this.routee.navigate(['/successMessage/error/'+this.failedMsg+'/product']); // navigate to other page
     }
     );

    }
  }
  resetForm(): void {
    this.form.reset();
  }



}

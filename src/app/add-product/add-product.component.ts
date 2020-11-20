import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import {Router} from '@angular/router'; // import router from angular router
import { Product } from '../models/product';
import {UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { CategoryService } from '../services/category.service';
import { MeasurementsService } from '../services/measurements.service';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent implements OnInit {
  
  product;
  isCollapsed = false;
  listOfSelectedColor = [];
  listOfSelectedSize = [];
  productName?: string;
  selectedCategory = null;
  selectedSubCategory = null;
  form: FormGroup;
  keyword:string[]=[];
  keyW;
  images:string[]=[];
  size;
  image;
  categories;
  isEnglish = false;
  subCategories:string[]=[];
  measurements;
  isSpinning = false;
  successMsg = "Product Is Successfully Added!!!";
  failedMsg = "Failed To Add Product!!!";
  token;

  constructor(private http:HttpClient,private route:Router,private userService:UserService,private productService:ProductsService,
    private categoryService:CategoryService,private measurementService:MeasurementsService,private fb: FormBuilder,private i18n: NzI18nService) {
    this.form = this.fb.group({
      productName: [null, [Validators.required]],
      productCategory: [null, [Validators.required]],
      productSubCategory: [''],
      description: [''],
      minOrder: [null, [Validators.required]],
      price: [null, [Validators.required]],
      keyword: [''],
      measurement: [''],
      color:[],
      size:[],
      sizeInNumber:[''],
      images: [null, [Validators.required]]
    })
  } 
 
  ngOnInit(): void {

    this.token = this.userService.getToken();
    if(this.token.userType != 'admin'){
      this.route.navigate(['/products']);
    }
    this.getCategories();
    this.getMeasurements();
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
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

  uploadFile(event) {
  
    if (event.target.files.length > 0) {
      this.images = event.target.files;
    }

   
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

      var productSubCategoryForm = this.form.get('productSubCategory').value;
      if(productSubCategoryForm != null){
        formData.append('keyword', productSubCategoryForm);
      } 
      
      this.keyW = this.form.get('keyword').value;
      if(this.keyW != null){
        if(this.keyW.indexOf(',') != -1){
          var keyw = this.keyW.split(',');
          for(var i=0;i<keyw.length;i++){
            this.keyword.push(keyw[i]);
          }
        }else if(this.keyW != ""){
          formData.append('keyword', this.form.get('keyword').value);
        }
      }
  
      formData.append("productName", this.form.get('productName').value);
      formData.append("productCategory", this.form.get('productCategory').value);
      formData.append("productSubCategory", this.form.get('productSubCategory').value);
      formData.append("description", this.form.get('description').value);
      formData.append("minOrder", this.form.get('minOrder').value);
      formData.append("price", this.form.get('price').value);
      formData.append('measurement', this.form.get('measurement').value);
      formData.append('keyword', this.form.get('productName').value);
      formData.append('keyword', this.form.get('productCategory').value);

      for(let keyW of this.keyword){
        formData.append('keyword', keyW);
      }
     
      formData.append("additionalProductInfo",productColors);
      formData.append("additionalProductInfo",productSizes);
      formData.append("additionalProductInfo",productSizeInNumber);
      
      for(let img of this.images){
        formData.append('images', img);
      }

      this.productService.addProduct(formData).subscribe(
       (response) => {
         
           console.log(response)
           this.route.navigate(['/successMessage/success/'+this.successMsg+'/product']); // navigate to other page
        },
        (error) => {
          console.log(error)
          this.route.navigate(['/successMessage/error/'+this.failedMsg+'/product']); // navigate to other page
        }
       );
    }
  }
  resetForm(): void {
    this.form.reset();
  }

}

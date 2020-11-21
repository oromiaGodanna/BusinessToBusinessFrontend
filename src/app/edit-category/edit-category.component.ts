import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Product } from '../models/product';
import {Router} from '@angular/router'; // import router from angular router
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { ActivatedRoute } from '@angular/router';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.sass']
})
export class EditCategoryComponent implements OnInit {

  constructor(private http:HttpClient,private routee:Router,private categoryService:CategoryService,
    private route: ActivatedRoute,private userService:UserService,private fb: FormBuilder,private i18n: NzI18nService) { 
    this.form = this.fb.group({
      categoryName: [null, [Validators.required]],
      subCategories: [''],
      image: [''],
      //subCategoryName0:[''],
      //subCategoryName1:['']
    });
  }
  form: FormGroup;
  categoryId;
  subCategories:string[]=[];
  image=null;
  categoryName;
  subCategory;
  categoryObj :Category;
  sub='';
  category;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  subCategoryLength;
  isSpinning = false;
  isEnglish = false;
  successMsg = "Category Is Successfully Edited!!!";
  failedMsg = "Failed To Edit Category!!!";
  token;

  ngOnInit(): void {
    this.token = this.userService.getToken();
    if(this.token.userType != 'admin'){
      this.routee.navigate(['/products']);
    }else{
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;

    this.route.paramMap.subscribe(params => {
      var _id = params.get('id');
      this.categoryId = _id;
      this.categoryService.getCategory(_id).subscribe(res => {
        this.category= res;
        this.subCategoryLength = this.category.subCategories.length;

        for (let i = 0; i < this.category.subCategories.length; i++) {
          this.form.addControl('subCategoryName'+i, new FormControl(null, Validators.required));
        }

      });
    });
  }
 }


 uploadFile(event) {
  if (event.target.files.length > 0) {
    this.image = event.target.files[0];
  }
 }

 submitForm() {
   
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
      for (let i = 0; i < this.category.subCategories.length; i++) {
        if(this.sub == ''){
          this.sub =this.sub + this.form.get('subCategoryName'+i).value;
        // this.sub=this.sub + "first";
        }else{
          this.sub =this.sub + ',' + this.form.get('subCategoryName'+i).value;
          //this.sub=this.sub + ',' + "second";
        }
        
      }

      for (let i = 0; i < this.listOfControl.length; i++) {
        if(this.sub == ''){
          this.sub =this.sub + this.form.get('subCNames'+i).value;
        }else{
          this.sub =this.sub + ',' + this.form.get('subCNames'+i).value;
        }
        
      }
      if(this.image !=null){
        formData.append('image', this.image);
      }else{
        formData.append('image', this.category.image);
      }
     
      formData.append('categoryName',this.form.get('categoryName').value);
      var addedSubCategories = this.sub.split(',');
      for(let addedSubCategory of addedSubCategories){
        formData.append('subCategories', addedSubCategory);
      }

      /*this.category = {
        "categoryName":this.form.get('categoryName').value,
        "image":this.image,
        "subCategories":this.sub.split(','),
      };*/
      
      this.categoryService.editCategory(this.categoryId,formData).subscribe(
        (response) => {
            
          console.log(response)
          this.routee.navigate(['/successMessage/success/'+this.successMsg+'/category']); // navigate to other page
      },
      (error) => {
        console.log(error)
        this.routee.navigate(['/successMessage/error/'+this.failedMsg+'/category']); // navigate to other page
      }
        );
  }
 }
 resetForm(): void {
   this.form.reset();
 }

 addField(e?: MouseEvent): void {
  if (e) {
    e.preventDefault();
  }
  const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

  const control = {
    id,
    controlInstance: `subCNames${id}`
  };
  const index = this.listOfControl.push(control);
  console.log(this.listOfControl[this.listOfControl.length - 1]);
  this.form.addControl(this.listOfControl[index - 1].controlInstance, new FormControl(null, Validators.required));
}

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    
    const index = this.listOfControl.indexOf(i);
    this.listOfControl.splice(index, 1);
    console.log(this.listOfControl);
    this.form.removeControl(i.controlInstance);
    
  }
  removeSubCategoryField(i, e: MouseEvent): void {
    e.preventDefault();
   
      const index = this.category.subCategories.indexOf(i);
      this.category.subCategories.splice(index, 1);
      console.log(this.category.subCategories);
      this.form.removeControl('subCategoryName'+i);
   
  }
}

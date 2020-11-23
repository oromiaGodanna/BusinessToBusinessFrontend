import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Product } from '../models/product';
import {UserService } from '../services/user.service';
import {Router,ActivatedRoute} from '@angular/router'; // import router from angular router
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit {

  constructor(private http:HttpClient,private route:Router,private userService:UserService,private categoryService:CategoryService,
    private fb: FormBuilder,private i18n: NzI18nService) {
    this.form = this.fb.group({
      categoryName: [null, [Validators.required]],
      subCategories: [''],
      image: [null, [Validators.required]],
      subCNames:[''],
    });
   };
   
   form: FormGroup;
   categories;
   subCategories:string[]=[];
   image;
   categoryName;
   subCategory;
   category :Category;
   sub='';
   isSpinning = false;
   isEnglish = false;
   successMsg = "Category Is Successfully Added!!!";
   failedMsg = "Failed To Add Category!!!";
   token;

  listOfControl: Array<{ id: number; controlInstance: string }> = [];

   ngOnInit(): void {

    this.token = this.userService.getToken();

    if(this.token.userType != 'admin'){
      this.route.navigate(['/products']);
    }else{
      this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
      this.isEnglish = !this.isEnglish;
    }
  }

  
  uploadFile(event) {
    //this.image = event.target.files[0].name;
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
      for (let i = 0; i < this.listOfControl.length; i++) {
        if(i == 0){
          this.sub =this.sub + this.form.get('subCNames'+i).value;
        }else{
          this.sub =this.sub + ',' + this.form.get('subCNames'+i).value;
        }
        
      }
      var subC = this.form.get('subCNames').value;
      
        formData.append('image', this.image);
        formData.append('categoryName',this.form.get('categoryName').value);
        var addedSubCategories = this.sub.split(',');
        for(let addedSubCategory of addedSubCategories){
          formData.append('subCategories', addedSubCategory);
        }
        //formData.append('subCategories',this.sub.split(','));
     /* this.category = {
        "categoryName":this.form.get('categoryName').value,
        "image":this.image,
        "subCategories":this.sub.split(','),
      };*/
      
      this.categoryService.addCategory(formData).subscribe(
        (response) => {
          
          console.log(response)
          this.route.navigate(['/successMessage/success/'+this.successMsg+'/category']); // navigate to other page
      },
      (error) => {
        console.log(error)
        this.route.navigate(['/successMessage/error/'+this.failedMsg+'/category']); // navigate to other page
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

}

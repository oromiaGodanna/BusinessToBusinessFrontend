import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import {Router} from '@angular/router'; // import router from angular router
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { Proforma,Item } from '../models/proforma';
import { ProformaService } from '../services/proforma.service';

@Component({
  selector: 'app-request-proforma',
  templateUrl: './request-proforma.component.html',
  styleUrls: ['./request-proforma.component.sass']
})
export class RequestProformaComponent implements OnInit {

  form: FormGroup;
  categories;
  subCategories:string[]=[];
  isEnglish = false;
  sub='';
  items:Item[]=[];
  isSpinning = false;
  proforma:Proforma;
 

  listOfItems: Array<{ id: number; category: string; subCategory: string; description: string; quantity: string; }> = [];

  constructor(private http:HttpClient,private route:Router,private categoryService:CategoryService,private proformaService:ProformaService,private i18n: NzI18nService,
    private fb: FormBuilder) { 

      this.form = this.fb.group({
        category: [null, [Validators.required]],
        subCategory: [''],
        description: [''],
        startDate: [''],
        endDate: [''],
        maxResponse: [''],
        response:[''],
        quantity:[null, [Validators.required]],
      })

    
    }

  ngOnInit(): void {
    this.getCategories();
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

      var subCategoryOne="";
      var descriptionOne="";
      if(this.form.get('subCategory').value != null && this.form.get('subCategory').value != ""){
        subCategoryOne=this.form.get('subCategory').value;
      }
      if(this.form.get('description').value != null && this.form.get('description').value != ""){
        descriptionOne=this.form.get('description').value;
      }
      var itemObj={
        category:this.form.get('category').value,
        subCategory:subCategoryOne,
        quantity:parseInt(this.form.get('quantity').value),
        description:descriptionOne,
      }
  
      this.items.push(itemObj);

      for (let i = 0; i < this.listOfItems.length; i++) {

        var subCategoryAdded="";
        var descriptionAdded="";

        if(this.form.get('subCategory'+i).value != null && this.form.get('subCategory'+i).value != ""){
          subCategoryAdded = this.form.get('subCategory'+i).value;
        }
        if(this.form.get('description'+i).value != null && this.form.get('description'+i).value != ""){
          descriptionAdded = this.form.get('description'+i).value;
        }

        var category = this.form.get('category'+i).value;
        var subCategory = subCategoryAdded;
        var quantity = this.form.get('quantity'+i).value;
        var description = descriptionAdded;

        var item={
          "category":category,
          "subCategory":subCategory,
          "quantity":parseInt(quantity),
          "description":description,
        }

        this.items.push(item);
      }
      
      var startDateAdded=null;
      var endDateAdded=null;
      var maxResponseAdded=1000000;

      if(this.form.get('startDate').value != null && this.form.get('startDate').value != ""){
        startDateAdded = this.form.get('startDate').value;
      }
      if(this.form.get('endDate').value != null && this.form.get('endDate').value != ""){
        endDateAdded = this.form.get('endDate').value;
      }
      if(this.form.get('maxResponse').value != null && this.form.get('maxResponse').value != ""){
        maxResponseAdded = this.form.get('maxResponse').value;
      }
      

      this.proforma = {
        startDate:startDateAdded,
        endDate:endDateAdded,
        maxResponse:maxResponseAdded,
        items:this.items
      };
      
        this.proformaService.createProforma(this.proforma).subscribe(
        (response) => {
          
          console.log(response);
          var successMsg = "Proforma Is Successfully Added!!!";
        
          this.route.navigate(['/pendingProforma/'+successMsg]); // navigate to other page
        },
        (error) => {
          console.log(error);
          var failedMsg = "Failed To Add Proforma!!!";
          this.route.navigate(['/pendingProforma/'+failedMsg]); // navigate to other page
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
    const id = this.listOfItems.length > 0 ? this.listOfItems[this.listOfItems.length - 1].id + 1 : 0;

    const control = {
      id,
     category: `category${id}`,
     subCategory: `subCategory${id}`,
     description: `description${id}`,
     quantity: `quantity${id}`,
    };
    const index = this.listOfItems.push(control);
    console.log(this.listOfItems[this.listOfItems.length - 1]);
    this.form.addControl(this.listOfItems[index - 1].category, new FormControl(null, Validators.required));
    this.form.addControl(this.listOfItems[index - 1].subCategory, new FormControl());
    this.form.addControl(this.listOfItems[index - 1].description, new FormControl());
    this.form.addControl(this.listOfItems[index - 1].quantity, new FormControl(null, Validators.required));
  }

  removeField(i: { id: number; category: string; subCategory: string; description: string; quantity: string; }, e: MouseEvent): void {
    e.preventDefault();
   
      const index = this.listOfItems.indexOf(i);
      this.listOfItems.splice(index, 1);
      console.log(this.listOfItems);
      this.form.removeControl(i.category);
      this.form.removeControl(i.subCategory);
      this.form.removeControl(i.description);
      this.form.removeControl(i.quantity);
  }

  searchForProduct(){
    var searchWord =  (<HTMLInputElement>document.getElementById("searchWord")).value;
    this.route.navigate(['/searchForProduct', searchWord]);
  }

}

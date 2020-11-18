import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'; // import router from angular router
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { Proforma } from '../models/proforma';
import { ProformaService } from '../services/proforma.service';
import { ResponseService } from '../services/response.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-view-proforma',
  templateUrl: './view-proforma.component.html',
  styleUrls: ['./view-proforma.component.sass']
})
export class ViewProformaComponent implements OnInit {

  categories;
  proforma;
  subCategories:string[]=[];
  isSpinning = false;
  proformaId;
  itemId;
  itemCategory;
  message=null;
  addResponseModal=false;
  form: FormGroup;
  isEnglish = false;

  constructor(private httpClient:HttpClient,private categoryService:CategoryService,
    private proformaService:ProformaService, private router: Router,private routee: ActivatedRoute,
    private modal: NzModalService,private fb: FormBuilder,private responseService:ResponseService,private i18n: NzI18nService
    ) {

      this.form = this.fb.group({
        unitPrice: [null, [Validators.required]],
        
      })
     }

  ngOnInit(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;

   this.getAllCategories();
  
    this.routee.paramMap.subscribe(params => {
      var proformaId = params.get('proformaId');
      this.proformaService.getProforma(proformaId).subscribe(res => {
          this.proforma = res;
          this.proformaId = proformaId;
      });
    });

   
  }

  getAllCategories(): void {
    
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

  showResponseModal(itemId,itemCategory){
    this.itemId=itemId;
    this.itemCategory = itemCategory;
    this.addResponseModal=true;
  }

  addResponse(){
    var validationStatus =true;
    for (const i in this.form.controls) {
     
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
      
      if( this.form.controls[i].invalid){
       validationStatus = false;
      }
    }

    if(validationStatus ==true){
      this.addResponseModal=false;
      this.isSpinning = true;
     
      var responseData={
          itemId:this.itemId,
          unitPrice:parseInt(this.form.get('unitPrice').value)
      }

      this.responseService.sendResponse(responseData).subscribe(
        (response) => {
          var divId = document.getElementById(this.itemId).style.display = 'none';
          this.message="Response is Successfully Sent!";
          this.isSpinning = false;
        }
        );
    }

  }
  resetForm(): void {
    this.form.reset();
  }
   handleCancel(): void {
   this.addResponseModal = false;
  }

  searchForProduct(){
    var searchWord =  (<HTMLInputElement>document.getElementById("searchWord")).value;
    this.router.navigate(['/searchForProduct', searchWord]);
  }

}
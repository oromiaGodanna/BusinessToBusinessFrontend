import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import {UserService } from '../services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  constructor(private http:HttpClient,private categoryService:CategoryService, 
    private router: Router,private fb: FormBuilder,
    private modal: NzModalService,private message: NzMessageService,private userService:UserService,private i18n: NzI18nService) { }

  categories;
  subCategories=[];
  showImage=false;
  imageToView;
  isEnglish = false;
  token;
  loggedInStatus=this.userService.isLoggedIn();
  userDataa=this.userService.getUserData();

  ngOnInit(): void {
    //this.token = this.userService.getToken();
    if(this.userDataa.userType != 'Admin'){
      this.router.navigate(['/login']);
    }else{
      this.getCategories();
      this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
      this.isEnglish = !this.isEnglish;
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

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  showDeleteConfirm(categoryId): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete the Category?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteCategory(categoryId),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteCategory(categoryId):void{
    if(this.userDataa.userType != 'Admin'){
      this.router.navigate(['/login']);
    }else{
    this.categoryService.deleteCategory(categoryId).subscribe(res => {
       this.createMessage('success');
        var divId = document.getElementById(categoryId).style.display = 'none';
      
     });
    }
  }

  createMessage(type: string): void {
    this.message.create(type, `Category Successfully deleted!!!`);
  }

  viewImage(image){
    this.imageToView = image;
    this.showImage = true;
  }
  handleImageCancel(): void {
    this.showImage = false;
  }
  
}

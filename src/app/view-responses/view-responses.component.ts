import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'; // import router from angular router
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { Response } from '../models/response';
import { ResponseService } from '../services/response.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import {UserService } from '../services/user.service';
import {MessageService } from '../services/message.service';

@Component({
  selector: 'app-view-responses',
  templateUrl: './view-responses.component.html',
  styleUrls: ['./view-responses.component.sass']
})
export class ViewResponsesComponent implements OnInit {

  categories;
  responseData;
  responseDatas;
  subCategories:string[]=[];
  isSpinning = false;
  message=null;
  itemId;
  loggedInStatus=this.userService.isLoggedIn();
  userDataa=this.userService.getUserData();

  constructor(private httpClient:HttpClient,private categoryService:CategoryService,
    private responseService:ResponseService, private router: Router, private routee: ActivatedRoute,
    private modal: NzModalService,private userService:UserService,private messageService:MessageService
    ) { }

  ngOnInit(): void {
    if(this.userDataa._id == null){
      this.router.navigate(['/login']);
    }else{
      this.getAllCategories();
      this.routee.paramMap.subscribe(params => {
        this.itemId = params.get('itemId');

        this.responseService.getResponses(this.itemId).subscribe(res => {
          this.responseData = res;
          //this.responseData = this.responseDatas;
        });
      });
    }
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

  searchForProduct(){
    var searchWord =  (<HTMLInputElement>document.getElementById("searchWord")).value;
    this.router.navigate(['/searchForProduct', searchWord]);
  }

  contactSeller(sellerId){
    var loggedInUserId = this.userService.getUserData()._id;
  var conversation = {
    users:[sellerId,loggedInUserId],
    messages:[]
  };
 this.messageService.createConversation(conversation);
 this.router.navigate(['/message']);
}

}


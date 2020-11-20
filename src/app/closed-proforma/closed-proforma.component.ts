import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router'; // import router from angular router
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import {UserService } from '../services/user.service';
import { Proforma } from '../models/proforma';
import { ProformaService } from '../services/proforma.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-closed-proforma',
  templateUrl: './closed-proforma.component.html',
  styleUrls: ['./closed-proforma.component.sass']
})
export class ClosedProformaComponent implements OnInit {

  categories;
  closedProformas;
  subCategories:string[]=[];
  isSpinning = false;
  proforma:Proforma;
  message=null;
  proformaId;
  token;

  constructor(private httpClient:HttpClient,private categoryService:CategoryService,
    private proformaService:ProformaService, private routee: ActivatedRoute,private userService:UserService,
    private modal: NzModalService, private router: Router
    ) { }

  ngOnInit(): void { 
    this.token = this.userService.getToken();
    if(this.token.userId == null){
      this.router.navigate(['/products']);
    }else{
      this.getAllCategories();
      this.getClosedProformas();

        this.routee.paramMap.subscribe(params => {
          if(params.get('message')){
            this.message = params.get('message');
          }
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

  getClosedProformas(): void {
    
    this.proformaService.closedProformas().subscribe(res => {
      this.closedProformas = res;
    });
  }

  viewResponses(profromaId) {
   
  }

  searchForProduct(){
    var searchWord =  (<HTMLInputElement>document.getElementById("searchWord")).value;
    this.router.navigate(['/searchForProduct', searchWord]);
  }


}

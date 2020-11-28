import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'; // import router from angular router
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { Proforma } from '../models/proforma';
import { ProformaService } from '../services/proforma.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-opened-proforma',
  templateUrl: './opened-proforma.component.html',
  styleUrls: ['./opened-proforma.component.sass']
})
export class OpenedProformaComponent implements OnInit {
  
  categories;
  activeProformas;
  subCategories:string[]=[];
  isSpinning = false;
  proforma:Proforma;
  successMsg = "Proforma Is Successfully Closed!!!";
  failedMsg = "Failed To close Proforma!!!";
  message=null;
  proformaId;
  closeProformaVisible=false;
  loggedInStatus=this.userService.isLoggedIn();
  userDataa=this.userService.getUserData();

  constructor(private httpClient:HttpClient,private categoryService:CategoryService,
    private proformaService:ProformaService, private routee: ActivatedRoute,
    private modal: NzModalService, private router: Router,private userService:UserService
    ) { }

  ngOnInit(): void {
    if(this.userDataa._id == null ){
      this.router.navigate(['/login']);
    }else{
    this.getAllCategories();
    this.getActiveProformas();

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

  getActiveProformas(): void {
    if(this.userDataa._id == null ){
      this.router.navigate(['/login']);
    }else{
      this.proformaService.activeProformas().subscribe(res => {
        this.activeProformas = res;
      });
    }
  }

  showCloseConfirm(profromaId): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to close this Proforma?',
      nzContent: '',
      nzCancelText: 'No',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.closeProforma(profromaId),
      nzOnCancel: () => console.log('Cancel')
    });
  }

  closeProforma(profromaId):void{
   
    this.proformaService.closeProforma(profromaId).subscribe(res => {
      var divId = document.getElementById(profromaId).style.display = 'none';
      this.createMessage("Proforma is Successfully closed!!!"); 
      
     });
     
  }

  createMessage(msg){
    this.message = msg;
  }
  
}

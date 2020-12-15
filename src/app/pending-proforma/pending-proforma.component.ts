import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router'; // import router from angular router
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { Proforma,Item } from '../models/proforma';
import { ProformaService } from '../services/proforma.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import {UserService } from '../services/user.service';
import {NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-pending-proforma',
  templateUrl: './pending-proforma.component.html',
  styleUrls: ['./pending-proforma.component.sass']
})
export class PendingProformaComponent implements OnInit {

  form: FormGroup;
  categories;
  pendingProformas;
  subCategories:string[]=[];
  isEnglish = false;
  sub='';
  items:Item[]=[];
  isSpinning = false;
  proforma:Proforma;
  successMsg = "Proforma Is Successfully Added!!!";
  failedMsg = "Failed To Add Proforma!!!";
  message=null;
  proformaId;
  openProformaVisible=false;
  token;
  loggedInStatus=this.userService.isLoggedIn();
  userDataa=this.userService.getUserData();

  constructor(private http:HttpClient,private router:Router,private categoryService:CategoryService,
    private proformaService:ProformaService,private i18n: NzI18nService, private routee: ActivatedRoute, private notificationService: NotificationService,
    private modal: NzModalService,private userService:UserService,private fb: FormBuilder,private messageService: NzMessageService
    ) { 
      this.form = this.fb.group({
        endDate: [''],
      })
    }

  ngOnInit(): void {
    //this.token = this.userService.getToken();
    if(this.userDataa._id == null ){
      this.router.navigate(['/login']);
    }else{
      this.getCategories();
      this.getPendingProformas();

        this.routee.paramMap.subscribe(params => {
          if(params.get('message')){
            this.message = params.get('message');
          }
        });

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

  getPendingProformas(): void {
    
    this.proformaService.pendingProformas().subscribe(res => {
      this.pendingProformas = res;
    });
  }

  showDeleteConfirm(profromaId): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this Proforma?',
      nzContent: '',
      nzCancelText: 'No',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteProforma(profromaId),
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteProforma(profromaId):void{
   
    this.proformaService.deleteProforma(profromaId).subscribe(res => {
      var divId = document.getElementById(profromaId).style.display = 'none';
      this.createMessage("Proforma is Successfully deleted!!!"); 
      
     });
     
  }

  createMessage(msg){
    this.isSpinning = false;
    this.message = msg;
  }

  openProformaModal(proformaId): void {
    this.proformaId = proformaId;
    this.openProformaVisible = true;
  }

  openProforma(){

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

      this.openProformaVisible = false;
      this.isSpinning = true;

      var endDateForProforma = null;
      if(this.form.get('endDate').value != null && this.form.get('endDate').value != ""){
        endDateForProforma = this.form.get('endDate').value;
      }

      var proformaData = {
          endDate:endDateForProforma,
      };

      this.isSpinning = false;

      this.proformaService.requestProforma(this.proformaId,proformaData).subscribe(async res => {
      
        
        ///get subcribers;
          this.userService.getMe().subscribe((user)=>{
            var subscriberIds=[];
            user.subscribers.forEach((subscriber)=>{
              subscriberIds.push(subscriber._id)
            });
            var notification = {
              notificationType:'performa',
              recipients: subscriberIds,
              title:'A new performa is available!',
              content:'Fill it now, don\'t say for later',
              target:this.proformaId,
              externalModelType:'Performa'
            };
            this.notificationService.sendNotificationRealtime(notification);
          });

         
         
        // var divId = document.getElementById(this.proformaId).style.display = 'none';
        // this.createMessage("Proforma is made Public Successfully!!!"); 
        var msg = "Proforma is made Public Successfully!!!";
        this.router.navigate(['activeProformas/'+msg]);
       });
    }
  }

  resetForm(): void {
    this.form.reset();
  }

  handleOk(): void {
   // this.isVisible = false;
  }

  handleCancel(): void {
   this.openProformaVisible = false;
  }

}

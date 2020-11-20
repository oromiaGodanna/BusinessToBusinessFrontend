import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { MeasurementsService } from '../services/measurements.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { Router } from '@angular/router';
import {UserService } from '../services/user.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.sass']
})
export class MeasurementsComponent implements OnInit {

  constructor(private http:HttpClient,private measurementService:MeasurementsService, 
    private router: Router,private fb: FormBuilder,private userService:UserService,
    private modal: NzModalService,private message: NzMessageService,private i18n: NzI18nService) { 
      this.form = this.fb.group({
        measurementName: [null, [Validators.required]],
      
      });
    }

  measurements;
  isEnglish = false;
  editModal=false;
  measurementId;
  measurement;
  measurementName;
  form: FormGroup;
  isSpinning=false;

  token;

  ngOnInit(): void {
    this.token = this.userService.getToken();
    
    if(this.token.role != 'admin'){
      this.router.navigate(['/products']);
    }
    this.getMeasurements();
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }

  getMeasurements(): void {
    
      this.measurementService.getMeasurements().subscribe(res => {
        this.measurements = res;
      });
  }


  showDeleteConfirm(measurementId): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete the Measurement?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.deleteMeasurement(measurementId),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteMeasurement(measurementId):void{
    if(this.token.role != 'admin'){
      this.router.navigate(['/products']);
    }
    this.measurementService.deleteMeasurement(measurementId).subscribe(res => {
       this.createMessage('success',`Measurement Successfully deleted!!!`);
        var divId = document.getElementById(measurementId).style.display = 'none';
      
     });
    
  }

  createMessage(type: string,msg:string): void {
    this.message.create(type, msg);
  }

  showEditModal(measurementId,measurementName){
    this.measurementId = measurementId;
    this.measurementName = measurementName;
    this.editModal = true;
  }

  editMeasurement(){
    if(this.token.role != 'admin'){
      this.router.navigate(['/products']);
    }

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

      this.measurementName = this.form.get('measurementName').value;
     this.measurement = {
        "measurementName":this.form.get('measurementName').value,
      
      };
      
      this.measurementService.editMeasurement(this.measurementId, this.measurement).subscribe(
        (response) => {
          this.isSpinning = false;
          this.editModal = false;
          this.createMessage('success',`Measurement Successfully Edited!!!`);
          var divId = document.getElementById("measurementName"+this.measurementId).innerHTML = this.measurementName;
      }
      );
    }
  }

  resetForm(): void {
    this.form.reset();
  }

  handleCancel(): void {
    this.editModal = false;
  }
  
}



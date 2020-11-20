import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Product } from '../models/product';
import {UserService } from '../services/user.service';
import {Router} from '@angular/router'; // import router from angular router
import { HttpClient } from '@angular/common/http';
import { MeasurementsService } from '../services/measurements.service';
import { Measurement } from '../models/measurement';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';


@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.sass']
})
export class AddMeasurementComponent implements OnInit {

  constructor(private http:HttpClient,private route:Router,private userService:UserService,private measurementService:MeasurementsService,
    private fb: FormBuilder,private i18n: NzI18nService) {
    this.form = this.fb.group({
      measurementName: [null, [Validators.required]],
     
    });
   };
   form: FormGroup;
   measurements;
   categoryName;
   measurement :Measurement;
   isSpinning = false;
   isEnglish = false;
   successMsg = "Measurement Is Successfully Added!!!";
   failedMsg = "Failed To Add Measurement!!!";
   token;

   ngOnInit(): void {
    this.token = this.userService.getToken();
    if(this.token.role != 'admin'){
      this.route.navigate(['/products']);
    }
    this.isEnglish = !this.isEnglish;
  }

  addMeasurement() {
    
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
      
        
     this.measurement = {
        "measurementName":this.form.get('measurementName').value,
      
      };
      
      this.measurementService.addMeasurement(this.measurement).subscribe(
        (response) => {
          
          console.log(response)
          this.route.navigate(['/successMessage/success/'+this.successMsg+'/measurement']); // navigate to other page
      },
      (error) => {
        console.log(error)
        this.route.navigate(['/successMessage/error/'+this.failedMsg+'/measurement']); // navigate to other page
      }
      );
    }
  }
  resetForm(): void {
    this.form.reset();
  }

}

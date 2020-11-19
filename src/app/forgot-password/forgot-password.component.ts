import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppHttpService } from '../services/app-http.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('resetForm') resetForm: NgForm;
  email: string;
  error: boolean = false;
  errorMsg: string;
  restLinkSent: boolean = false;
  successMsg: string;
 
  constructor(
    private userService: UserService) { }

  onSubmit(){
    this.email = this.resetForm.value.email;
    this.userService.forgotPassword(this.email).subscribe(
      (response: any) => {
        // console.log('response', response);
        if(response.status == 200){
          this.restLinkSent = true;
          this.successMsg = response.msg;
          // console.log('msg', this.successMsg);
        }
      }, (error:HttpErrorResponse) => {
        // console.log('error response', error.error);
        this.error = true;
        this.errorMsg = error.error ;
      });
  }

  changeEmail(){
    this.restLinkSent = false;
    this.resetForm.reset();
  }
  
  goToEmail(){
    window.open("https://www.gmail.com");
  }
  ngOnInit(): void {
  }

}

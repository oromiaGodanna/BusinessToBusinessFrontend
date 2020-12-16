import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppHttpService } from '../services/app-http.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginInfo } from '../models/login.model';
import { UserService } from '../services/user.service';

//import 'rxjs/add/operator/map';
//import { LoginInfo } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordVisible = false;
  error: boolean = false;
  errorMsg: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private message: NzMessageService) { }

  onSubmit(form: NgForm) {
    const loginInfo = new LoginInfo(
      form.value.email.toLowerCase(),
      form.value.password);

    this.userService.loginUser(loginInfo).subscribe(
      (response:any) => {
        if (response.status == 200) {
          this.userService.storeUserData(response.token, response.user);
          if(response.user.userType == 'Buyer'){
            this.router.navigate(['/index']);
          }else{
            this.message.success('Login Successful.');
            this.router.navigate([`/my_account`, 'myProducts']);
          }
        }
      },(error:HttpErrorResponse) =>{
          this.error = true;
          this.errorMsg = error.error;
        });
   }

  forgotPassword() {
    this.router.navigate(['forgot_password']);
  }

  ngOnInit(): void {
  }

  sideInfo = {
    title: "WELCOME BACK!",
    subTitle: "Let's Get Started",
    content: "We empower our customers with the fundamental infrastructure for commerce and new technology, so that they can build businesses and create value that can be shared among our digital economy participants. Login in to unlock the power we provide for your company."
  }
}

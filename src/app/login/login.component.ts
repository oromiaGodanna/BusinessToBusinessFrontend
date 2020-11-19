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
          if(response.user.userType == 'Admin'){
            this.userService.isAdmin = true;
          }
          this.message.success('Login Successful.');
          this.router.navigate([`my_account/${response.id}/view`]);
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
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  }
}

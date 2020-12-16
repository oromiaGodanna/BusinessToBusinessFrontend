import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../services/user.service';
import { LoginInfo } from '../../models/login.model';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.less']
})
export class AdminLoginComponent implements OnInit {
  passwordVisible = false;
  error: boolean = false;
  errorMsg: string;

  constructor( private userService: UserService,
    private router: Router,
    private message: NzMessageService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const loginInfo = new LoginInfo(
      form.value.email.toLowerCase(),
      form.value.password);

    this.userService.loginAdmin(loginInfo).subscribe(
      (response:any) => {
        console.log(response);
        if (response.status == 200) {
          console.log(response);
          this.userService.storeUserData(response.token, response.user);
           console.log('user data', this.userService.getUserData());
            this.userService.isAdmin = true;
            this.router.navigate(['admin']);
          }
      },(error) =>{
          this.error = true;
          this.errorMsg = error.error;
        });
   }

}

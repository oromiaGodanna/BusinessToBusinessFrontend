import { NgForOf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  @ViewChild('changeEmailForm') changeEmailForm: NgForm;

  email: string;
  error: boolean = false;
  errorMsg: string;
  user;
  userId: string;
  verficationLinkSent: boolean = false;
  successMsg: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private message: NzMessageService
  ) { }


  ngOnInit(): void {
    this.user = this.userService.getUserData();
    this.userId = this.user._id;
  }

  onSubmit() {
    this.email = this.changeEmailForm.value.email.toLowerCase();
    this.userService.changeEmail(this.userId, this.email).subscribe(
      (response) => {
        if(response.status == 200){
          this.message.success('Email successfully changes. Please verfiy your Email to login');
          this.userService.logOut();
          this.router.navigate(['/login']);
        }    
      }, (error) =>{
        this.error = true;
        this.errorMsg = error.error;
        this.message.error('Failed to Change your email');
      }
    )
  }

  onCancel() {
    this.router.navigate(['my_account', this.userId, 'view']);
  }
  
  cancel(){
    this.message.info('Email change Canceled');
  }

  changeEmail(){
    
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  passwordVisible = false;
  error: boolean = false;
  errorMsg: string;
  userId: string;
  user;

  constructor( private userService: UserService,
    private router: Router,
    private message: NzMessageService) { }

  passwordPattern= "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
  //passwordPattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
  
  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordPattern)]),
        confirmPassword: new FormControl(null, [Validators.required])
      }, this.passwordMatch) 
    });
  }

  passwordMatch(controls: FormGroup): { invalid: boolean } {
    if (controls.get('password').value !== controls.get('confirmPassword').value) {
      controls.get('confirmPassword').setErrors({ 'noMatch': true });
      return { invalid: true };
    }
    return null;
  }

  onSubmit(){
    this.userId = this.userService.getUserData()._id;
    this.userService.changePassword(this.userId, this.changePasswordForm.get('oldPassword').value, this.changePasswordForm.get('newPassword.password').value).subscribe(
      (response) =>{
        console.log(response);
        if(response.status == 200){
          this.message.success('Password successfully Changed');
          this.router.navigate(['/my_account', this.userId, 'view']);
        }
      },(error)=>{
        console.log(error);
        this.error = true;
        this.errorMsg = error.error;
      });
  }

  onCancel(){
    this.router.navigate(['/my_account', this.userId, 'view']);
  }

 

}

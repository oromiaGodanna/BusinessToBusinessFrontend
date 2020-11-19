import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AppHttpService } from '../services/app-http.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  passwordVisible = false;
  password: string;
  error: boolean = false;
  errorMsg: string;
  resetForm: FormGroup;

  passwordPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";
  // passwordPattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
  passwordReseted = false;


  constructor(
    private userService: UserService,
    private http: AppHttpService,
    private route: ActivatedRoute,) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.token = params['token'];
      });

    this.resetForm = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl(null, [Validators.required]),
    }, this.passwordMatch);
  }

  passwordMatch(form: FormGroup): { invalid: boolean } {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ 'noMatch': true });
      return { invalid: true };
    }
    return null;
  }

  onSubmit() {
    this.password = this.resetForm.get('password').value;
    this.userService.resetPassword(this.token, this.password).subscribe(
      (response: Response) => {
        console.log('response', response);
        if(response.status == 200){
          this.passwordReseted = true;
        }
      }, (error: HttpErrorResponse) => {
        this.error = true;
        this.errorMsg = error.error;
      }
    )
  }




}

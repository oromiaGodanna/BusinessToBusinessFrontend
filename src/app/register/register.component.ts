import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RegisterInfo } from '../models/register.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  token: string;
  current = 0;
  signupForm: FormGroup;
  initialCountry = "ET";
  selectedCountry = 'Ethiopia';
  userInfo;
  passwordVisible = false;
  error: boolean = false;
  errorMsg: string;
  verfication: string;
  resendEmail: string;
  mobile: any;
  regitredUser;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['token'] != null) {
          this.verfication = 'waiting';
          this.current = 1;
          this.userService.confirmEmail(params['token']).subscribe((response: any) => {
            // console.log('email confirmation in registration componet');
            if (response.status == 200) {
              this.verfication = 'sent';
              this.userService.createPaymnetAccount(response.user._id).subscribe((reponse: any) => {
                if (reponse.status == 200) {
                  //update customer data
                }
              });
              this.onNext();
            }
          }, (error: HttpErrorResponse) => {
            console.log('error response', error);
            this.verfication = 'failed';
            this.current = 1;
            this.error = true;
            this.errorMsg = error.error;
          });
        }
        else {
          this.initForm();
        }
      });
  }

  onSubmit() {
    const registerInfo = new RegisterInfo(
      this.signupForm.get('email').value.toLowerCase(),
      this.signupForm.get('password.password').value,
      this.signupForm.get('firstName').value,
      this.signupForm.get('lastName').value,
      this.signupForm.get('role').value,
      this.signupForm.get('companyName').value,
      this.signupForm.get('tinNumber').value,
      this.signupForm.get('mobile').value,
    );

    this.userInfo = registerInfo;
    this.userService.registeruser(registerInfo).subscribe(
      (response: any) => {
        console.log('reponse', response);
        if (response.status == 200) {
          this.message.success('Registration Successful');
          this.onNext();
          this.verfication = 'sent';
          this.token = response.token;
        }
      }, (error: HttpErrorResponse) => {
        console.log('login error response', error);
        this.error = true;
        this.errorMsg = error.error;
      });
  }

  onResend() {
    if (!this.resendEmail) {
      this.resendEmail = this.signupForm.get('email').value;
    }
    this.userService.resendEmailConfirmation(this.resendEmail).subscribe((response: any) => {
      // console.log(response);
      this.verfication = 'sent';
      this.current = 1;
    }, (error: HttpErrorResponse) => {
      // console.log(error);
      this.error = true;
      this.errorMsg = error.error;
    })
  }

  // passwordPattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
  passwordPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";
  //mobileNoPattern = "^([+]39)?((38[{8,9}|0])|(34[{7-9}|0])|(36[6|8|0])|(33[{3-9}|0])|(32[{8,9}]))([\d]{7})$";
  mobileNoPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  private initForm() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordPattern)]),
        confirmPassword: new FormControl(null, [Validators.required]),
      }, this.passwordMatch),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      //country: new FormControl(this.selectedCountry, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      companyName: new FormControl(null, Validators.required),
      tinNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern(this.mobileNoPattern)]),
      agree: new FormControl(null, Validators.required)
    });
  }

  passwordMatch(controls: FormGroup): { invalid: boolean } {
    if (controls.get('password').value !== controls.get('confirmPassword').value) {
      controls.get('confirmPassword').setErrors({ 'noMatch': true });
      return { invalid: true };
    }
    return null;
  }

  onNext(): void {
    this.current += 1;
  }

  onVerify() {
    window.open("https://www.gmail.com");
  }

  sideInfo = {
    title: "WELCOME!",
    subTitle: "Let's Get Started",
    content: " We provide the technology infrastructure and marketing reach to help merchants, brands and other businesses to leverage the power of new technology to engage with their users and customers and operate in a more efficient way. We enable commercial and social interactions among businesses every day. We aim to build the future infrastructure of commerce, to bring together manufacturers in Ethiopia with the global market. Create an account and help us reach the goals we envision."
  }

  agreement = "While creating a website account: i agree to abide by the company Name membership agreemet-willing to receive related memeber ans service emails from company Name";
}
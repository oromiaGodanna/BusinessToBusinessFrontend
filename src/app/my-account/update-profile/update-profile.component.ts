import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AppHttpService } from 'src/app/services/app-http.service';

import { BuyerProfile, SellerProfile } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  profileForm: FormGroup;
  date = null;
  user;
  userId: string;
  userData;

  businessTypes = [
    { label: 'Iphones', value: 'phone', groupLabel: 'Electronics' },
    { label: 'T-shirt', value: 'cloth', groupLabel: 'Clothing' },
    { label: 'DeskTops', value: 'pcs', groupLabel: 'Electronics' }
  ];

  title: string = "Complete Your Profile"
  socials = ['facebook', 'twitter', 'linkedin', 'instagram'];

  constructor(
    private http: AppHttpService,
    private route: ActivatedRoute,
    private userService: UserService,) { }

  phonePattern = "^((\\+91-?)|0)?[0-9]{10}$";

  ngOnInit(): void {
    this.user = this.userService.getUserData();
    this.userId = this.user._id;
    this.initForm();
    this.loadUser();
  }

  private loadUser() {
    this.profileForm.patchValue(this.user);
  }

  private initForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.email]),
      userType: new FormControl({ value: null, disabled: true }, [Validators.required]),
      companyName: new FormControl(null, [Validators.required]),
      alternativeEmail: new FormControl(null, [Validators.email]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern(this.phonePattern)]),
      telephone: new FormControl(null, [Validators.pattern(this.phonePattern)]),
      socialLinks: new FormGroup({
        facebook: new FormControl(null),
        twitter: new FormControl(null),
        linkedin: new FormControl(null),
        instagram: new FormControl(null),
      }),
      fax: new FormControl(null),
      tinNumber: new FormControl({ value: null, disabled: true }, [Validators.minLength(10), Validators.maxLength(10)]),
      yearEstablished: new FormControl(null),
      businessType: new FormControl(null),
      numOfEmployees: new FormControl(null, [Validators.min(0)]),
      address: new FormControl(null),
      officalWebsite: new FormControl(null),
      aboutUs: new FormControl(null),
    });
  }

  onSubmit() {
    if (this.user.userType == 'Buyer') {
       this.userData = new BuyerProfile(
        this.profileForm.get('email').value.toLowerCase(),
        this.profileForm.get('firstName').value,
        this.profileForm.get('lastName').value,
        this.profileForm.get('userType').value,
        this.profileForm.get('companyName').value,
        this.profileForm.get('tinNumber').value,
        this.profileForm.get('alternativeEmail').value,
        this.profileForm.get('mobile').value,
        this.profileForm.get('telephone').value,
      );
    } else {
      this.userData = new SellerProfile(
        this.profileForm.get('email').value.toLowerCase(),
        this.profileForm.get('firstName').value,
        this.profileForm.get('lastName').value,
        this.profileForm.get('userType').value,
        this.profileForm.get('companyName').value,
        this.profileForm.get('tinNumber').value,
        this.profileForm.get('alternativeEmail').value,
        this.profileForm.get('mobile').value,
        this.profileForm.get('telephone').value,
        this.profileForm.get('socialLinks').value,
        this.profileForm.get('fax').value,
        this.profileForm.get('yearEstablished').value,
        this.profileForm.get('businessType').value,
        this.profileForm.get('numOfEmployees').value,
        this.profileForm.get('address').value,
        this.profileForm.get('officalWebsite').value,
        this.profileForm.get('aboutUs').value,
      );
    }
    console.log('userData', this.userData);
    this.userService.updateProfile(this.userId, this.userData).subscribe(
      (response: any) => {
        console.log('response', response);
      }, (error: HttpErrorResponse) => {
        console.log('error', error);
      });
  }

  onCancel() {
    this.profileForm.reset();
    this.loadUser();
  }
}





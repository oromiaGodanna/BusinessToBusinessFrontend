import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AppHttpService } from 'src/app/services/app-http.service';

import { UserProfile } from '../../models/user.model';
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
  countries = [];
  initialCountry = 'ET';

  businessTypes = [
    { label: 'Iphones', value: 'phone', groupLabel: 'Electronics' },
    { label: 'T-shirt', value: 'cloth', groupLabel: 'Clothing' },
    { label: 'DeskTops', value: 'pcs', groupLabel: 'Electronics' }
  ];

  userData = {
    firstName: String,
    lastName: String,
    email: String,
    userType: String,
    companyName: String,
    //joined: Number,
    alternativeEmail: String,
    mobile: String,
    telephone: String,
    socialLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String
    },
    fax: String,
    tinNumber: Number,
    yearEstablished: Number,
    businessType: String,
    numOfEmployees: Number,
    address: String,
    country: String,
    officalWebsite: String,
    aboutUs: String
  }
  title: string = "Complete Your Profile"
  socials = ['facebook', 'twitter', 'linkedin', 'instagram'];

  constructor(
    private http: AppHttpService,
    private route: ActivatedRoute,
    private userService: UserService,) { }

  phonePattern = "^((\\+91-?)|0)?[0-9]{10}$";

  ngOnInit(): void {
    this.user = this.userService.getUserData();
    // this.user = JSON.parse(localStorage.getItem('user'));
    this.userId = this.user._id;
    this.userService.getCountries().subscribe((response: any) => {
      if (response.status == 200) {
        this.countries = response.countries;
        const country: any = this.countries.filter(country => country.name == this.user.country);
        if (country) {
          this.initialCountry = country[0].value;
        }
      }
    });

    this.initForm();
    this.loadUser();
  }

  // editProfile() {
  //   this.profileForm.enable();
  // }

  private loadUser() {
    this.profileForm.patchValue(this.user);
  }

  private initForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      userType: new FormControl(null, [Validators.required]),
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
      tinNumber: new FormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
      yearEstablished: new FormControl(null),
      businessType: new FormControl(null),
      numOfEmployees: new FormControl(null, [Validators.min(0)]),
      country: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      // address: new FormGroup({
      //   country: new FormControl(null),
      //   region: new FormControl(null),
      //   city: new FormControl(null)
      // }),
      officalWebsite: new FormControl(null),
      aboutUs: new FormControl(null),
    });
  }

  onSubmit() {
    // const userData = new UserProfile(
    //   this.profileForm.get('email').value.toLowerCase(),
    //   this.profileForm.get('firstName').value,
    //   this.profileForm.get('lastName').value,
    //   this.profileForm.get('userType').value,
    //   this.profileForm.get('companyName').value,
    //   this.profileForm.get('alternativeEmail').value,
    //   this.profileForm.get('mobile').value,
    //   this.profileForm.get('telephone').value,
    //   this.profileForm.get('socialLinks.facebook').value,
    //   this.profileForm.get('socialLinks.instagram').value,
    //   this.profileForm.get('socialLinks.twitter').value,
    //   this.profileForm.get('socialLinks.linkedin').value,
    //   this.profileForm.get('fax').value,
    //   this.profileForm.get('tinNumber').value,
    //   this.profileForm.get('yearEstablished').value,
    //   this.profileForm.get('businessType').value,
    //   this.profileForm.get('numOfEmployees').value,
    //   this.profileForm.get('country').value,
    //   this.profileForm.get('address').value,
    //   this.profileForm.get('officalWebsite').value,
    //   this.profileForm.get('aboutUs').value,
    // );
    this.userData.firstName = this.profileForm.get('firstName').value,
      this.userData.lastName = this.profileForm.get('lastName').value,
      this.userData.email = this.profileForm.get('email').value.toLowerCase(),
      this.userData.userType = this.profileForm.get('userType').value,
      this.userData.companyName = this.profileForm.get('companyName').value,
      //this.userData.joined = this.profileForm.get('joined').value,
      this.userData.alternativeEmail = this.profileForm.get('alternativeEmail').value,
      this.userData.mobile = this.profileForm.get('mobile').value,
      this.userData.telephone = this.profileForm.get('telephone').value,
      this.userData.socialLinks.facebook = this.profileForm.get('socialLinks.facebook').value,
      this.userData.socialLinks.twitter = this.profileForm.get('socialLinks.twitter').value,
      this.userData.socialLinks.instagram = this.profileForm.get('socialLinks.instagram').value,
      this.userData.socialLinks.linkedin = this.profileForm.get('socialLinks.linkedin').value,
      this.userData.fax = this.profileForm.get('fax').value,
      this.userData.tinNumber = this.profileForm.get('tinNumber').value,
      this.userData.yearEstablished = this.profileForm.get('yearEstablished').value,
      this.userData.businessType = this.profileForm.get('businessType').value,
      this.userData.numOfEmployees = this.profileForm.get('numOfEmployees').value,
      this.userData.country = this.profileForm.get('country').value,
      this.userData.address = this.profileForm.get('address').value,
      // this.userData.address.region = this.profileForm.get('address.region').value,
      // this.userData.address.city = this.profileForm.get('address.city').value,
      this.userData.officalWebsite = this.profileForm.get('officalWebsite').value,
      this.userData.aboutUs = this.profileForm.get('aboutUs').value,

      console.log('userData', this.userData);
    ///console.log(this.profileForm);
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

  getTelephone(value: any) {

  }

  getMobile(value: any) {

  }

  mobileHasError(event: any) {

  }

  telephoneHasError(event: any) {

  }
}





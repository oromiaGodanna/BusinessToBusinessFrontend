import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppHttpService } from '../services/app-http.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  user;
  loggedInUser;
  subscribed = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      });
    this.userService.getUserProfile(this.id).subscribe(
      (response: any) => {
        this.user = response.user;
      }, (error: HttpErrorResponse) => {
        this.message.error('Something Happend while trying to retrive the Users Profile.');
      }
    );
    if(this.userService.isLoggedIn()){
      this.loggedInUser = this.userService.getUserData();
      if(this.loggedInUser.subscribedTo.includes(this.id)){
        this.subscribed = true;
      }
    }
  }

  subscribe() {
    if (!this.userService.isLoggedIn()) {
      this.message.info('You need to Login to Subscribe');
    }else {
      this.userService.subscribeTo(this.loggedInUser._id, this.id).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.userService.updateUserData(response.subscriber);
            this.subscribed = true;
            this.message.success('You are Subscribed');
          }
        },(error) =>{
          this.message.success(`${error.error} Could not subscribe. Please try again`);
        })
      }
  }


  unsubscribe(){
     this.userService.unsubscribe(this.loggedInUser._id, this.id).subscribe(
       (response: any) =>{
         if(response.status == 200){
          this.subscribed = false;
          this.userService.updateUserData(response.subscriber);
          this.message.success('You have Unsubscribed');
         }
       }, (error) => {
        this.message.success(`${error.error} Could not unsubscribe. Please try again`);
       }
     )

  }

 
}

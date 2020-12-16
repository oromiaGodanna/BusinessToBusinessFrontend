import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.less']
})
export class SubscribeComponent implements OnInit {
user;
userId;
  subscribers;

  constructor( private userService: UserService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserData()._id;

    this.userService.getSubscribers(this.userId).subscribe(
      (response: any) => {
        this.user = response.customer;
        this.subscribers = this.user.subscribers;
        console.log(this.subscribers);
      }, (error) => {
        this.message.error(error.error);
      }
    );

  }

  

}

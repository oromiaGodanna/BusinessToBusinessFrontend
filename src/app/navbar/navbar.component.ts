import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { NotificationService } from '../services/notification.service';
import { MessageService } from '../services/message.service';
import { element } from 'protractor';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;

  notificationCount: number = 0;
  messageCount: number = 0;

  constructor(private authService: AuthService, private notificationService: NotificationService,
    private messageService: MessageService, private userService: UserService) {

    this.notificationService.getUnreadCount();

    this.notificationService.unreadNotificationCount().subscribe((count) => {
      console.log(`count: ${count}`);
      this.notificationCount = count;
    });

    this.messageService.getUnreadMessageCount();

    this.messageService.unreadCountReceived().subscribe((count) => {
      let unreadMsgCount: number = 0;
      count.forEach((element) => {
        unreadMsgCount += element.unread;
      })

      this.messageCount = unreadMsgCount;
      console.log(`unread message: ${this.messageCount}`);

    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userService.userSubject.subscribe((user: User) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

  }

  logout() {
    this.userService.logOut();
  }



}

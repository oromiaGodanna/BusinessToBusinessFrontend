import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { NotificationService } from '../services/notification.service';
import { MessageService } from '../services/message.service';
//jerry's
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
//
import { element } from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;

  notificationCount: number = 0;
  messageCount: number = 0;

  //jerry's
  countCart=0;
  countWishlist=0;
  //
  constructor(private authService: AuthService, private notificationService: NotificationService,
    private messageService: MessageService,private wishlistService:WishlistService,private cartService:CartService) {

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
    this.authService.userSubject.subscribe((user: User) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

      if(this.isLoggedIn){
        let countingCart = this.cartService.countCart().subscribe();
        this.countCart = 4;
      }

      if(this.isLoggedIn){
        let countingWishlist = this.wishlistService.countWishlist().subscribe();
        this.countWishlist = 5;
      }


  }

  logout() {
    this.authService.logout();
  }



}

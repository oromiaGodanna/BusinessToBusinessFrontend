import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { NotificationService } from '../services/notification.service';
import { MessageService } from '../services/message.service';
//jerry's
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import {UserService } from '../services/user.service';
//

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  userType="";
  notificationCount: number = 0;
  messageCount: number = 0;

  //jerry's
  countCart = 0;
  countWishlist = 0;
  //
  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router,
    private messageService: MessageService, private wishlistService: WishlistService, private cartService: CartService, private userService: UserService) {

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

    if (this.isLoggedIn) {
      this.cartService.countCart().subscribe(res => {
        this.countCart = Number(res);
      });
      this.wishlistService.countWishlist().subscribe(res => {
        this.countWishlist = Number(res);
      });
    }

  }

  logout() {
    this.userService.logOut();
    this.router.navigate(['login']);
    //this.authService.logout();
  }

  searchForProduct() {
    var searchWord = (<HTMLInputElement>document.getElementById("searchWord")).value;
    this.router.navigate(['/searchForProduct', searchWord]);
  }


}

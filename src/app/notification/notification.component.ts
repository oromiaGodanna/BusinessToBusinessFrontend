import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Observable } from 'rxjs';
import { SysNotification } from '../models/notification';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {

  // bug: template not updating when array is updated

  // notifications$: Observable<SysNotification[]>;
  notifications: SysNotification[] = [];

  constructor(private notService: NotificationService, public authService: AuthService) {
    // this.notifications$ = this.notService.getNotifications();

  }

  ngOnInit(): void {
    this.notService.getNotifications().subscribe((values) => {
      this.notifications = values;
    })
  }

  markAsViewed(id) {
    // this.notService.markAsViewed(id).subscribe((notification: SysNotification) => {
    //   const index = this.notifications.findIndex((value) => {
    //     return value._id == notification._id;
    //   });

    //   this.notifications[index] = notification;
    // });
    this.notService.markAsViewedRealtime(id);
    
    this.notService.viewedNotification().subscribe((notification: SysNotification) => {
      const index = this.notifications.findIndex((value) => {
        return value._id == notification._id;
      });

      this.notifications[index] = notification;
    });
  }


  deleteNotification(id) {
    console.log("delete notification");
    this.notService.deleteNotification(id).subscribe((notification: SysNotification) => {
      console.log(notification);
      const index = this.notifications.indexOf(notification);
      this.notifications.splice(index, 1);
    })
  }



}

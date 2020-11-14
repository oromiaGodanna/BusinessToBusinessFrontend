import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { SysNotification, notificationType, externalModelType } from '../models/notification';
import { stringify } from 'querystring';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.less']
})
export class NewNotificationComponent implements OnInit {

  notification = {
    title: null,
    content: null
  };

  selectValue: string;

  constructor(private notService: NotificationService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async saveNotification(value) {

    console.log("in save notification");

    const userId = this.authService.getCurrentUser()._id;

    // get users subscribers, replace userId

    const notification: SysNotification = {
      notificationType: notificationType[notificationType.promotion],
      recipients: [userId],
      title: value.title,
      content: value.content,
      target: userId,
      externalModelType: externalModelType[externalModelType.Customer],
      // sender: userId,
    }

    console.log(notification);

    // this.notService.createNotification(notification).subscribe((value) => {
    //   console.log(value);
    // });
    this.notService.sendNotificationRealtime(notification);

    this.router.navigate(['/promotion'], { queryParams: { selected: 'notification'}});
  }
}

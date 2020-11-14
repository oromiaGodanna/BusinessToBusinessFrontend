import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../services/promotion.service';
import { Email } from '../models/promotion';
import { NotificationService } from '../services/notification.service';
import { externalModelType, notificationType, SysNotification } from '../models/notification';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.less']
})
export class PromotionComponent implements OnInit {

  selected = 'email';

  emails: Email[] = [];
  notifications: SysNotification[] = [];

  constructor(public promoService: PromotionService,
    private notService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((paramMap) => {
      if (paramMap.has('selected')) {
        this.selected = paramMap.get('selected');
      }

    })

    this.onSelectedChanged();


  }

  getEmails() {
    this.promoService.getEmails().subscribe((emails: Email[]) => {
      this.emails = emails;
      console.log(this.emails);
      // this.promoService.emails = emails;
      // console.log(this.promoService.emails);
    })
  }

  getPromotionNotification() {
    this.notService.getNotificationSentByUser().subscribe((notifications: SysNotification[]) => {
      console.log(notifications);
      this.notifications = notifications;
    })
  }

  onSelectedChanged() {
    if (this.selected == 'email') {
      this.getEmails();
    } else {
      this.getPromotionNotification();
    }
  }

}

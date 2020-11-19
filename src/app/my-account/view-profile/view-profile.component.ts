import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AppHttpService } from 'src/app/services/app-http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userId: string;
  user;

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getUserData();
    this.userId = this.user._id;
    const registerdDate = new Date(this.user.registeredDate);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.user.joined = `${months[registerdDate.getMonth()]} , ${registerdDate.getFullYear()}`;
  }

  onEdit() {
    console.log("on edit");
    this.router.navigate([`/my_account/${this.userId}/update`]);
  }

}

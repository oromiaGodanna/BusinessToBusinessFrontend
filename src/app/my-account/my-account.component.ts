import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  // isCollapsed = false;
  userId;
  constructor(
    private userService: UserService,
    private router: Router,
    private message: NzMessageService) { }

  // toggleCollapsed(): void {
  //   this.isCollapsed = !this.isCollapsed;
  // }

  ngOnInit(): void {
    this.userId = (JSON.parse(localStorage.getItem('user')))._id;
  }

  logout(){
    this.userService.logOut();
    this.message.success('Log Out Successful.');
    this.router.navigate(['login']);
    

  }

}

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
usersData = [];
  constructor(private userService: UserService,  private message: NzMessageService,   private router: Router,) { }

  ngOnInit(): void {
    // console.log(this.userService.getAllUsers());
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        console.log(response);
        this.usersData = response.customers;
      }, (error: HttpErrorResponse) => {
        this.message.error('Something Happend while trying to retrive the Users Profile.');
      }
    );
    
  }

  viewProfile(i){
    const userId = this.usersData[i]._id;
    this.router.navigate(['/profile', userId]);


  }

  delete(i){

  }

}

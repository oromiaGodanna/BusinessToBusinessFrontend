import { Component, OnInit } from '@angular/core';
import { AppHttpService } from './services/app-http.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'bTob';
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.setLocalStorageToNull();
  }
}

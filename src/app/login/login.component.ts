import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(f){
    console.log(f.value);
    this.authService.login(f.value).subscribe((res) => {
      if(res.body){
        let token = res.headers.get('x-auth-token');
        this.authService.setToken(token);
        this.authService.setCurrentUser(token);
      }
    }, (error) => {
      console.log(error);
    })
  }

}

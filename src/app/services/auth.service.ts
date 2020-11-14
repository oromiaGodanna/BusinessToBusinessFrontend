import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000';

  userSubject = new Subject<User>();

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post(`${this.url}/auth`, user, { observe: 'response' });
  }

  logout(){
    this.setToken(null);
    this.userSubject.next(null);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    let token = this.getToken();
    if (token) { return true; }
    return false;
  }

  setCurrentUser(token) {
    const helper = new JwtHelperService();
    try {
      this.userSubject.next(helper.decodeToken(token));

    } catch (error) {
      console.log('Invalid token');
    }
  }

  getCurrentUser() :User{
    let token = this.getToken();
    const helper = new JwtHelperService();
    try {
      return helper.decodeToken(token);

    } catch (error) {
      console.log('Invalid token');
    }
  }
}

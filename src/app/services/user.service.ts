import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DeleteRequest } from '../models/deleteRequest.model';
import { LoginInfo } from '../models/login.model';
import { RegisterInfo } from '../models/register.model';
import { AppHttpService } from './app-http.service';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken: any;
  user: any;
  _isLoggedIn = false;
  isAdmin = false;


  userSubject = new Subject<User>();


  serverUrl = 'http://localhost:3000';
  constructor(private http: AppHttpService) { }


  loginUser(loginInfo: LoginInfo): Observable<any> {
    const url = `${this.serverUrl}/customer/login`;
    return this.http.post(url, loginInfo);
  }

  registeruser(registerInfo: RegisterInfo): Observable<any> {
    const url = `${this.serverUrl}/customer/register`;
    return this.http.post(url, registerInfo);
  }

 confirmEmail(token: String):Observable<any>{
   const url = `${this.serverUrl}/customer/email_confirmation/${token}`;
   return this.http.get(url);
 }

 resendEmailConfirmation(email):Observable<any>{
   const url = `${this.serverUrl}/customer/resend_confirmation`;
   return this.http.post(url, { email: email});
 }
 
 getUserProfile(userId):Observable<any>{
   const url = `${this.serverUrl}/customer/${userId}`;
   console.log(url);
   return this.http.get(url);
 }

 forgotPassword(email):Observable<any>{
   const url = `${this.serverUrl}/customer/forgotPassword`;
   return  this.http.put(url, {email: email});
 }

 resetPassword(token, password):Observable<any>{
   const url = `${this.serverUrl}/customer/resetPassword/${token}`;
   console.log('user service reset password', url);
   console.log('token', token);
   return this.http.put(url, {newPassword: password})
 }

 getCountries():Observable<any>{
   const url = `${this.serverUrl}/countries`;
   return this.http.get(url);
 }

 changePassword(id, oldPassword, newPassword):Observable<any>{
  //  const id = this.getUserData()._id;
  //  console.log(id);
   const url = `${this.serverUrl}/customer/changePassword/${id}` ;
   return this.http.put(url, {oldPassword: oldPassword, newPassword: newPassword});
 }

 changeEmail(id, email):Observable<any>{
   const url = `${this.serverUrl}/customer/changeEmail/${id}`;
   return this.http.put(url, {email: email});
 }

 updateProfile(id, userData){
   const url = `${this.serverUrl}/customer/updateProfile/${id}`;
   return this.http.put(url, userData);
 }

 sendDeleteRequest(id, deleteRequest: DeleteRequest): Observable<any>{
 const url=`${this.serverUrl}/customer/deleteRequest/${id}`;
 return this.http.post(url, deleteRequest)
 }

 subscribeTo(id, userId):Observable<any>{
   const url = `${this.serverUrl}/customer/subscribe/${id}`;
   return this.http.put(url, {id: userId})
 }

 unsubscribe(id, userId):Observable<any>{
   const url = `${this.serverUrl}/customer//unsubscribe/${id}`;
   return this.http.put(url, userId);
 }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.userSubject.next(null);

  }
  
setLocalStorageToNull(){
  localStorage.setItem('token', null);
  localStorage.setItem('user', null);
}

  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.setCurrentUser(token);
  }

  updateUserData(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUserData() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    if (this.getUserData()) {
      return true
    } else {
      return false
    }
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
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

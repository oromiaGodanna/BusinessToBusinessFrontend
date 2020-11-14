import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email, Sms } from '../models/promotion';
import { SysNotification } from '../models/notification';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  url = 'http://localhost:3000/promotions';

  emails: Email[] = [];
  sms: Sms[] = [];
  sentNotifications: SysNotification[] = [];

  constructor(private http: HttpClient) { }

  sendEmail(email: Email){
    return this.http.post(`${this.url}/email`, email);
  }


  sendSms(sms: Sms){
    return this.http.post(`${this.url}/sms`, sms);
  }

  // getAllPromotions(){
  //   return this.http.get(this.url);
  // }

  getEmails(){
    return this.http.get(`${this.url}/email`);
  }

  getEmailById(id){
    return this.http.get(`${this.url}/email/${id}`);
  }

  updateEmail(id, email: Email){
    return this.http.put(`${this.url}/email/${id}`, email);
  }

  getSms(){
    
  }

  

  // will be in seller service
  getSubscribers(){

    return [
      {
        _id: "5e5e163bfa804a1bd4f8c9a6",
        email: "tungat72@gmail.com",
        name: "tunga"
      },
      {
        _id: "5e5e16d7fa804a1bd4f8c9a7",
        email: "tungat72@gmail.com",
        name: "abel"
      },
      {
        _id: "5e5e16f4fa804a1bd4f8c9a8",
        email: "tungat72@gmail.com",
        name: "bob"
      }
    ];
    
  }

}

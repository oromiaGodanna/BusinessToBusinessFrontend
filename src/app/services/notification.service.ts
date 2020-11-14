import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SysNotification } from '../models/notification';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = 'http://localhost:3000/notifications';

  socket;

  constructor(private http: HttpClient, private socketService: SocketService) { 
    this.socket = this.socketService.socket;
  }


  getNotifications(){
    return this.http.get<SysNotification[]>(this.url);
  }

  getNotification(id){
    return this.http.get<SysNotification>(`${this.url}/${id}`);
  }
  
  getNotificationByType(type){
    return this.http.get<SysNotification[]>(`${this.url}/type/${type}`);
  }

  getNotificationSentByUser(){
    console.log("calling notification backend");
    return this.http.get<SysNotification[]>(`${this.url}/sender`);
  }

  createNotification(notification: SysNotification){
    return this.http.post(this.url, notification);
  }

  deleteNotification(id){
    return this.http.delete(`${this.url}/${id}`);
  }

  deleteAllNotifications(){
    return this.http.delete(this.url);
  }

  deleteAllNotificationsByType(type){
    return this.http.delete(`${this.url}/type/${type}`);
  }

  markAsViewed(id){
    return this.http.put(`${this.url}/${id}`, null);
  }


  // socket routes

  sendNotificationRealtime(notification: SysNotification){
    this.socket.emit('notification', notification);
  }

  newNotificationReceived(){
    const observable = new Observable<SysNotification>(observer => {
      this.socket.on('new notification', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  unreadNotificationCount(){
    const observable = new Observable<number>(observer => {
      this.socket.on('unread notification count', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getUnreadCount(){
    this.socket.emit('get unread count');
  }


  markAsViewedRealtime(id){
    this.socket.emit('viewed', id);
  }

  viewedNotification(){
    const observable = new Observable<SysNotification>(observer => {
      this.socket.on('viewed notification', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


}

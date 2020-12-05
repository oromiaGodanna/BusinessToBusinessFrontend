import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conversation, Message } from '../models/message';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';
import { SocketService } from './socket.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = 'http://localhost:3000';


  // private socket = io('http://localhost:3000', { query: {token: this.authService.getToken()} });

  socket: SocketIOClient.Socket;

  unreadCount = new Subject<{ convId: string, unread: number }[]>();

  constructor(private http: HttpClient, private authService: AuthService, private socketService: SocketService) {
    this.socket = this.socketService.socket;
  }


  joinRoom(convId) {
    console.log(convId);
    this.socket.emit('join', convId);
  }

  sendMessageRealtime(convId, message) {

    console.log(convId, message);

    this.socket.emit('message', convId, message);
  }

  newMessageReceived() {
    const observable = new Observable<{ convId, message }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


  unreadCountReceived() {
    const observable = new Observable<{ convId: string, unread: number }[]>(observer => {
      this.socket.on('unreadCount', (count) => {
        console.log(`count object: ${count}`);
        this.unreadCount.next(count);
        observer.next(count);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getUnreadMessageCount() {
    this.socket.emit('get unread count');
  }


  getNumberOfUnreadMessages(convId: string) {
    /// return the unread property of tha conversation

    let convCount;
    this.unreadCount.subscribe((count) => {
      console.log(count);
      convCount = count.find((count) => {
        return count.convId == convId;
      });
    });


    return convCount ? convCount.unread : 0;
  }

  getAllConversations(userId) {
    return this.http.get<Conversation[]>(this.url + '/messages');
  }

  getConversation(convId) {
    return this.http.get<Conversation>(this.url + `/messages/${convId}`);
  }

  getConversationRealtime(convId){
    this.socket.emit('get conversation', convId);
  }

  receiveConversation() {
    const observable = new Observable<Conversation>(observer => {
      this.socket.on('receive conversation', (count) => {
        observer.next(count);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  createConversation(conversation) {
    return this.http.post<Conversation>('/messages',conversation);
  }

  createConversationRealTime(conversation) {
    this.socket.emit("create conversation",conversation);
  }

  sendMessage(convId, message) {
    // console.log(convId);
    // console.log(message);
    return this.http.put<Conversation>(this.url + '/messages/' + convId, message);
  }

  deleteMessage(userId, convId, messageIds: Array<String>) {
    console.log("in service delete message function");
    return this.http.put<Conversation>(this.url + `/messages/deleteMany/${convId}`, { messageIds: messageIds });
  }
}

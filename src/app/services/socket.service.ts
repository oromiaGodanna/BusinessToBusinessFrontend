import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket = io('http://localhost:3000', { query: {token: this.userService.getToken()} });


  constructor(private userService: UserService) { }
}

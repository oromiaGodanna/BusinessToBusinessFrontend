import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket = io('http://localhost:3000', { query: {token: this.authService.getToken()} });


  constructor(private authService: AuthService) { }
}

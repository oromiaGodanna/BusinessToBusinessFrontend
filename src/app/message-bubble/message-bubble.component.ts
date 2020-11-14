import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/message';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.less']
})
export class MessageBubbleComponent implements OnInit {

  // @Input() text: string;
  // @Input() image: string;
  // @Input() sentByCurrentUser: boolean;

  @Input() message: Message;
  @Input() sentByCurrentUser: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

}

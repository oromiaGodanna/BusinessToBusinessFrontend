import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Conversation, Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { ChangeBackgroundDirective } from '../directives/change-background.directive';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {


  conversations: Conversation[] = [];
  // user1Id = '5e5e163bfa804a1bd4f8c9a6';  /// get this from token
  user: User;
  messages: Message[] = [];
  selectedConversationId: string = null;

  showOptions = false;
  selectedMessages: Message[] = [];

  // for badges
  count: { convId: string; unread: number; }[] = [];

  @ViewChildren(ChangeBackgroundDirective) message_boxs: QueryList<ChangeBackgroundDirective>;

  @ViewChild(CdkVirtualScrollViewport) public virtualScrollViewport?: CdkVirtualScrollViewport;

  constructor(private messageService: MessageService, private userService: UserService) {
    this.messageService.newMessageReceived().subscribe((data) => {
      console.log('new message received', data);
      // this.messages.push(msg);
      if (data.convId == this.selectedConversationId) {
        this.messages = [...this.messages, data.message];
        this.virtualScrollViewport.scrollTo({ bottom: 0 });

        console.log(`messages: ${this.messages}`);

      } else {
        // show number badge
        console.log('show number badge');
      }
    });


    this.messageService.newConversationCreated().subscribe((data) => {

        this.conversations = data;
    });

    // this.messageService.unreadCountReceived().subscribe(() => { });

    // this.messageService.unreadCount.subscribe((unreadCount) => {
    //   this.count = unreadCount;
    // })

  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getAllConversations(this.user._id);

    this.messageService.unreadCountReceived().subscribe((unreadCount) => {
      this.count = unreadCount;
      console.log(`unreadCount: ${unreadCount}`);
    })

  }

  getAllConversations(userId) {

    this.messageService.getAllConversations(userId)
      .subscribe((conv: Conversation[]) => {
        console.log(conv);
        this.conversations = conv;

        // this.conversations.forEach((conv) => {
        //   this.messageService.joinRoom(conv._id);
        // });
      });
  }

  getMessages(convId) {
    // this.selectedConversationId = convId;
    // this.messageService.getConversation(convId)
    //   .subscribe((conv: Conversation) => {
    //     console.log(conv);
    //     this.messages = conv.messages;

    //     // console.log(this.message_bubbles);

    //   });

    this.selectedConversationId = convId;
    this.messageService.getConversationRealtime(convId);

    this.messageService.receiveConversation()
      .subscribe((conv: Conversation) => {
        console.log(conv);
        this.messages = conv.messages;
      });
  }

  sendMessageRealtime(messageText) {

    if (!messageText.value) {
      console.log("message is empty");
      return;
    }

    console.log(this.user);

    let message = {
      sender: { _id: this.user._id, firstName: this.user.firstName },
      message: messageText.value,
    };

    this.messageService.sendMessageRealtime(this.selectedConversationId, message);

    messageText.value = '';
  }


  sendMessage(messageText) {

    if (!messageText.value) {
      console.log("message is empty");
      return;
    }

    let message = {
      message: messageText.value,
    };

    this.messageService.sendMessage(this.selectedConversationId, message)
      .subscribe((conv: Conversation) => {
        // console.log(conv);
        this.messages = conv.messages;
        // console.log(`sent message: ${message}`);
        // this.messages.push(message);
      });

    messageText.value = '';
  }

  deleteMessage() {
    console.log("in delete message");

    const messageIds = [];
    this.selectedMessages.forEach(element => {
      messageIds.push(element._id);
    });

    // make a method to delete multiple messages at the same time
    this.messageService.deleteMessage(this.user._id, this.selectedConversationId, messageIds)
      .subscribe((conv: Conversation) => {
        console.log(conv);
        this.messages = conv.messages;
        this.showOptions = false;

        this.selectedMessages = [];
        this.message_boxs.forEach((message_box) => {
          if (message_box.toggle == true) {
            message_box.onClick();
          }
        });

      })
  }

  toggleShowOptions(message) {
    this.showOptions = true;

    // cancel
    if (!message) {
      this.showOptions = false;
      this.selectedMessages = [];
      return;
    }

    if (this.showOptions) {
      if (!this.selectedMessages.includes(message)) {
        this.selectedMessages.push(message);
      } else {
        let index = this.selectedMessages.indexOf(message);
        this.selectedMessages.splice(index, 1);
        if (this.selectedMessages.length == 0) {
          this.showOptions = false;
        }
      }
    }

    console.log(this.selectedMessages);
  }

  getNumberOfUnreadMessages(convId: string) {

    if (this.count.length == 0) return;

    // console.log(`in getNumberOfUnreadMessages: ${this.count}`);

    let num = this.count.find((countConv) => { return countConv.convId == convId });

    return num ? num.unread : 0;

  }

}

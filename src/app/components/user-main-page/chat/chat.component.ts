// src/app/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: any[] = [];
  messageContent: string = '';
  username: string = '';
  connected: boolean = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getMessage().subscribe((message) => {
      this.messages.push(message);
    });
  }

  connect() {
    if (this.username) {
      this.chatService.connect(this.username);
      this.connected = true;
    }
  }

  sendMessage() {
    if (this.messageContent.trim()) {
      this.chatService.sendMessage({
        sender: this.username,
        content: this.messageContent,
        type: 'CHAT'
      });
      this.messageContent = '';
    }
  }

  disconnect() {
    this.chatService.disconnect(this.username);
    this.connected = false;
  }
}
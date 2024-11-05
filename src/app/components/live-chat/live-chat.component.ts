import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrl: './live-chat.component.css'
})
export class LiveChatComponent {
  
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

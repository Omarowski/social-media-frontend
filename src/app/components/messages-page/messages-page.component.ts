import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPanelComponent } from "./info-panel/info-panel.component";
import { MessagesHistoryPanelComponent } from "./messages-history-panel/messages-history-panel.component";
import { ChatMessageService } from '../../services/chatMessage.service';
import { User } from '../../common/user';
import { AuthService } from '../../services/auth.service';
import { WebSocketService } from '../../services/websocket.service';
import { Message } from '../../common/message';
import { UserMessage } from '../../common/userMessage';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrl: './messages-page.component.css'
})
export class MessagesPageComponent {
 
  currentUser:User | undefined;  // Example current user (logged-in user)
  selectedUser: string = '';  // The user to chat with
  users: any[] = [];  // List of users
  messages: Message[] = [];
  messageContent = '';
  username ='';
  highlightedUser = -1;
  typing = false;          // Whether the other user is typing
  typingTimeout: any; 
  private onlineUsers: Set<string> = new Set();
  @ViewChildren('myInputs') inputElements!: QueryList<ElementRef>;

  constructor(private chatService: ChatMessageService, private authService: AuthService, private websocketService: WebSocketService) { }

  ngOnInit(): void {
  
    // this.currentUser = this.authService.getUserDetails();
    this.currentUser = JSON.parse(localStorage.getItem('userDetails')!);
    this.loadUsers();
    this.websocketService.connect(this.currentUser!.firstName,() => { 
      this.websocketService.onPrivateMessage(this.currentUser!.firstName!, (message) => {
        const realMessage: Message = JSON.parse(message.body)

        

        //  const realMessage = JSON.parse(message.body)
         if(realMessage.sender === this.selectedUser) {
          this.messages.push(realMessage)
          console.log(this.users.find(data => data.firstName === 'Omar'))
         }
         
         else {
          const person = this.users.find(data => data.firstName === realMessage.sender)
          person.latestMessage = realMessage.content
          
         }
         
         console.log(realMessage)

        //  this.highlightedUser = this.users.findIndex( item => item.firstName === realMessage.sender)
         
          // this.messages.push(JSON.parse(message.body));
          
        })


        this.websocketService.subscribeToTyping(this.currentUser?.firstName!, (message) => {
          const typingMessage:Message = JSON.parse(message.body);
          console.log(typingMessage)
          if(typingMessage.sender === this.selectedUser) {
            this.handleTypingEvent(typingMessage);
          }
        });

        this.websocketService.subscribeToOnlineStatus((onlineUsers: string[]) => {
          console.log("baskdaskdkasdksadksakdsakdaskd")
          console.log(onlineUsers)
          this.onlineUsers = new Set(onlineUsers); // Update the list of online users
        });
        
    })
   
    
   
    
  }

  isUserOnline(username: string): boolean {
    return this.onlineUsers.has(username);
  }

  loadUsers(): void {
    this.chatService.getAllUsers(this.currentUser!.id)
      .subscribe(users => {
        this.users = users;
        this.selectUser(users[0].firstName)
      });
      // this.selectUser(this.users[0].firstName)
  }

  sendMessageStomp() {
    
    if(this.messageContent.trim() !== '') {
      
      this.websocketService.sendMessage('/app/chat.sendMessage', {
        sender: this.currentUser?.firstName,
        recipient: this.selectedUser,
        content: this.messageContent,
        type: 'CHAT'
      });
      console.log({
        sender: this.currentUser?.firstName,
        recipient: this.selectedUser,
        content: this.messageContent,
        type: 'CHAT'
      })
      this.messageContent = '';
    }
  }

  sendTypingNotification(isTyping: boolean) {
    const typingMessage = {
      sender: this.currentUser!.firstName, // Replace with actual logged-in username
      recipient: this.selectedUser,
      content: '', // No content for typing events
      type: isTyping ? 'TYPING' : 'STOP_TYPING'
    };

    this.websocketService.sendMessage('/app/chat.typing-event', typingMessage);
  }

  onTyping() {
    
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    // Notify the other user that you are typing
    this.sendTypingNotification(true);

    // Stop typing notification after 3 seconds of inactivity
    this.typingTimeout = setTimeout(() => {
      this.sendTypingNotification(false);
    }, 3000);
  }

  handleTypingEvent(chatMessage: Message) {
    if (chatMessage.type === 'TYPING') {
      this.typing = true;
    } else if (chatMessage.type === 'STOP_TYPING') {
      this.typing = false;
    }
  }

  selectUser(user: string): void {
    this.selectedUser = user;
    this.loadMessages();
    

    // setInterval(() => {
    //   this.loadMessages();
    // }, 5000);  // Poll for new messages every 5 seconds
  }

  sendMessage(): void {
    if (this.messageContent.trim() === '' || !this.selectedUser) {
      return;
    }

    this.chatService.sendMessage(this.currentUser!.firstName, this.selectedUser, this.messageContent)
      .subscribe(() => {
        this.messageContent = '';
        this.loadMessages();
      });
  }

  loadMessages(): void {
    if (this.selectedUser) {
      this.chatService.getMessages(this.currentUser!.firstName, this.selectedUser)
        .subscribe(messages => {
          console.log(messages)
          this.messages = messages;
        });
    }
  }
}

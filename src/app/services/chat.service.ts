// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() { }

  connect(username: string) {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/public', (message: any) => {
        if (message.body) {
          this.messageSubject.next(JSON.parse(message.body));
        }
      });

      // Notify that a user has joined
      this.sendMessage({
        sender: username,
        type: 'JOIN'
      });
    });
  }

  disconnect(username: string) {
    if (this.stompClient !== null) {
      this.sendMessage({
        sender: username,
        type: 'LEAVE'
      });
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  sendMessage(message: any) {
    this.stompClient.send(
      '/app/chat.sendMessage',
      {},
      JSON.stringify(message)
    );
  }

  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
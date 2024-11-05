// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../common/message';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  private apiUrl = 'http://localhost:8080/api/chatMessage';

  constructor(private http: HttpClient) { }

  sendMessage(sender: string, receiver: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, {}, {
      params: {
        sender: sender,
        receiver: receiver,
        content: content
      }
    });
  }

  getMessages(sender: string, receiver: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/${sender}/${receiver}`);
  }

  getAllUsers(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/userContacts/${userId}`);
  }
}
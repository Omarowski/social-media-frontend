import { Injectable } from "@angular/core";
import { Client, Message, Stomp } from "@stomp/stompjs";
import { Subject } from "rxjs";
import SockJS from "sockjs-client";


@Injectable({
    providedIn: 'root'
  })
  export class WebSocketService {
  
    private client: Client;
    private stompClient: any;
    
    // private messageSubject: Subject<any> = new Subject<any>();
  
    constructor() { 
        this.client = new Client({
            brokerURL:'ws://localhost:8080/ws',
            reconnectDelay:5000,
            heartbeatIncoming:4000,
            heartbeatOutgoing: 4000,
            webSocketFactory: () => new SockJS("http://localhost:8080/ws")
        })
    }
  
    connect(username: string, callback: () => void) {
      // this.client.activate()
      const socket = new SockJS("http://localhost:8080/ws")
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect({username},(frame:any) => {
        console.log('Connected: ' + frame);
        callback()
      })
    }
    
    disconnect() {
      this.stompClient.forceDisconnect()
    }
  
  
    sendMessage(destination: string, body: any) {
      this.stompClient.publish({destination, body: JSON.stringify(body) })
    }

    onMessage(topic: string, callback: (message: Message) => void) {
        this.stompClient.onConnect = () => {
            this.stompClient.subscribe(topic, callback)
        }
    }

    onPrivateMessage(user: string, callback: (message: Message) => void) {
        // this.stompClient.onConnect = () => {
            this.stompClient.subscribe(`/user/${user}/queue/messages`, callback)
        // }
    }

    subscribeToTyping(user: string, callback: (message: any) => void) {
      // this.stompClient.onConnect = () => {
        this.stompClient.subscribe(`/user/${user}/queue/typing`, callback);
      // }
    }

    subscribeToOnlineStatus(callback: (message: any) => void) {
      if (this.stompClient) {
        this.stompClient.subscribe('/topic/online', (message: any) => {
          callback(JSON.parse(message.body));
        });
      }
    }
  
    // getMessage(): Observable<any> {
    //   return this.messageSubject.asObservable();
    // }
  }
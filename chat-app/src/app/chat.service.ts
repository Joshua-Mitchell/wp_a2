import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private api = 'http://localhost:3000/api/';
  private socket = io('http://localhost:3000');

  constructor() { }

  joinChannel(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    let observable = new Observable<{user: String, message: String}> (observer => {
      this.socket.on('newUser', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{user: String, message: String}> (observer => {
      this.socket.on('leave Room', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }


  sendMessage(message) {
    console.log('message sending');
    console.log(message);
    this.socket.emit('message', message);
  }
  newMessageReceived() {
    let observable = new Observable<{user: String, message: String}> (observer => {
      this.socket.on('receive message', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }

}

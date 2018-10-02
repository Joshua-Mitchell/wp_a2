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
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect(); };
    });
    return observable;
  }


  addMessage(message) {
    let body = JSON.stringify(message);
    // return this.http.post(this.api);
  }

}

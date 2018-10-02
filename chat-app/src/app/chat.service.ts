import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private api = 'http://localhost:3000/api/';
  private socket = io('http://localhost:3000');

  constructor(private http: HttpClient) { }



  addMessage(message) {
    let body = JSON.stringify(message);
    return this.http.post(this.api);
  }

}

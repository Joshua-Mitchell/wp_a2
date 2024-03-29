// ============================================
// This service is responsible for CRUD actions
// to the group APIs
// ============================================

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private api:string = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  createGroup(data) {
    let body = JSON.stringify(data);
    return this.http.post(this.api + 'group/create', body, httpOptions);
  }

  deleteGroup(groupName, id) {
    return this.http.delete(this.api + 'group/delete/' + groupName + '/' + id);
  }

  getGroups(data) {
    let body = JSON.stringify(data);
    return this.http.post(this.api + 'groups', body, httpOptions);
  }

  createChannel(data) {
    let body = JSON.stringify(data);
    return this.http.post(this.api + 'channel/create', body, httpOptions);
  }

  getChannels(data) {
    let body = JSON.stringify(data);
    return this.http.post(this.api + 'channels', body, httpOptions);
  }

  deleteChannel(channelName, groupName, id) {
    return this.http.delete(this.api + 'channel/delete/' + channelName + '/' + groupName + '/' + id);
  }

}

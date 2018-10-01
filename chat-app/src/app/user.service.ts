// ============================================
// This service is responsible for CRUD actions
// to the user APIs
// ============================================

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api:string = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) {}

  login(data){
    let body = JSON.stringify(data);
    return this.http.post(this.api + 'login', body, httpOptions);
  }

  create(data) {
    let body = JSON.stringify(data);
    return this.http.post(this.api + 'user/create', body, httpOptions);
  }

  delete(username){
    return this.http.delete(this.api + 'user/delete/' + username);
  }
}

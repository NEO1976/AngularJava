import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bestellung } from './app-state/models';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';
  deleteUserId: string;
  userId: number;
  user: any;

  getUsers() {
    return this.http.get(this.rootURL + '/users');
  }

  addUser(user: any, id: number) {
 // user.id = id;
  this.userId = id;
  this.user = user;
  return this.http.post(this.rootURL + '/user', user);
  }

  deleteUser(user: any, id: number) {
    user.id = id;
    this.deleteUserId  = '/deleteUser/' + user.id;
    return this.http.delete(this.rootURL + this.deleteUserId, user.id);
  }

  addBestellung( bestellung: Bestellung) {
    this.userId = this.user.id;
    return this.http.post(this.rootURL  + '/' + this.userId + '/bestellung', bestellung);
  }

  getUser(id: number) {
    return this.http.get(this.rootURL + '/user/' +  id);
  }

}

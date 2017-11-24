import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CredentialsModel } from './models/credentials.model';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';

const BASE_URL = 'http://ponyracer.ninja-squad.com/api';
const REMEMBER_ME = 'rememberMe';

@Injectable()
export class UserService {
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private httpClient: HttpClient) {
    this.retrieveUser();
  }

  register(login, password, birthYear): Observable<UserModel> {
    const body = {login, password, birthYear};
    return this.httpClient.post<UserModel>(`${BASE_URL}/users`, body);
  }

  authenticate(credentials: CredentialsModel): Observable<UserModel> {
    return this.httpClient
      .post<UserModel>(`${BASE_URL}/users/authentication`, credentials)
      .do(user => this.storeLoggedInUser(user));
  }

  storeLoggedInUser(user) {
    window.localStorage.setItem(REMEMBER_ME, JSON.stringify(user));
    this.userEvents.next(user);
  }

  retrieveUser() {
    const json = window.localStorage.getItem(REMEMBER_ME);
    if (json) {
      this.userEvents.next(JSON.parse(json));
    }
  }

  logout() {
    this.userEvents.next(null);
    window.localStorage.removeItem(REMEMBER_ME);
  }

}

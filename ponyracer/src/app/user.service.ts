import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CredentialsModel } from './models/credentials.model';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';

const BASE_URL = 'http://ponyracer.ninja-squad.com/api';

@Injectable()
export class UserService {
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private httpClient: HttpClient) { }

  register(login, password, birthYear): Observable<UserModel> {
    const body = {login, password, birthYear};
    return this.httpClient.post<UserModel>(`${BASE_URL}/users`, body);
  }

  authenticate(credentials: CredentialsModel): Observable<UserModel> {
    return this.httpClient
      .post<UserModel>(`${BASE_URL}/users/authentication`, credentials)
      .do(user => this.userEvents.next(user));
  }

}

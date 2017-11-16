import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const BASE_URL = 'http://ponyracer.ninja-squad.com/api';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(login, password, birthYear): Observable<UserModel> {
    const body = {login, password, birthYear};
    return this.httpClient.post<UserModel>(`${BASE_URL}/users`, body);
  }

}

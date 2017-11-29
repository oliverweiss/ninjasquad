import { WsService } from './ws.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CredentialsModel } from './models/credentials.model';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';

const REMEMBER_ME = 'rememberMe';

@Injectable()
export class UserService {
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(
    private httpClient: HttpClient,
    private jwtInterceptor: JwtInterceptorService,
    private wsService: WsService) {
    this.retrieveUser();
  }

  register(login, password, birthYear): Observable<UserModel> {
    const body = {login, password, birthYear};
    return this.httpClient.post<UserModel>(`${environment.baseUrl}/api/users`, body);
  }

  authenticate(credentials: CredentialsModel): Observable<UserModel> {
    return this.httpClient
      .post<UserModel>(`${environment.baseUrl}/api/users/authentication`, credentials)
      .do(user => this.storeLoggedInUser(user));
  }

  storeLoggedInUser(user) {
    window.localStorage.setItem(REMEMBER_ME, JSON.stringify(user));
    this.jwtInterceptor.setJwtToken(user.token);
    this.userEvents.next(user);
  }

  retrieveUser() {
    const json = window.localStorage.getItem(REMEMBER_ME);
    if (json) {
      const user: UserModel = JSON.parse(json);
      this.jwtInterceptor.setJwtToken(user.token);
      this.userEvents.next(user);
    }
  }

  scoreUpdates(userId: number): Observable<UserModel> {
    return this.wsService.connect(`/player/${userId}`);
  }

  logout() {
    this.userEvents.next(null);
    this.jwtInterceptor.removeJwtToken();
    window.localStorage.removeItem(REMEMBER_ME);
  }
}

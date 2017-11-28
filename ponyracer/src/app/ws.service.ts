import { WEBSOCKET, WEBSTOMP } from './app.tokens';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class WsService {

  constructor(@Inject(WEBSOCKET) private WebSocket, @Inject(WEBSTOMP) private Webstomp) { }

  connect(channel): Observable<any> {
    return Observable.create(observer => {
      const connection = new this.WebSocket(`${environment.wsBaseUrl}/ws`);
      let subscription;
      const stompClient = this.Webstomp.over(connection);
      stompClient.connect(
        {login: null, password: null},
        () => {
          subscription = stompClient.subscribe(channel, message => {
            observer.next(JSON.parse(message.body));
          });
        },
        error => {
          observer.error(error);
        });
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        connection.close();
      };
    });
  }

}

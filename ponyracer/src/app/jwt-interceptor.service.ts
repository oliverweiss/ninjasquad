import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  private token: string;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = (this.token) ?
      req.clone({setHeaders: {'Authorization ': 'Bearer ' + this.token}}) :
      req;

    const response =  next
      .handle(newReq)

    return response;
  }

  setJwtToken(token: string) {
    this.token = token;
  }

  removeJwtToken() {
    this.token = null;
  }
}

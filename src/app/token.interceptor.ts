import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  tokenName = 'chairApp';
  getToken(): string {
    if (localStorage.getItem(this.tokenName) != null) {
      return JSON.parse(localStorage.getItem(this.tokenName));
    } else {
      return 'TokenDoesNotExist';
    }
  }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log('parsed---',this.getToken());

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.getToken()}`)
    });
    return next.handle(authReq);
  }
}

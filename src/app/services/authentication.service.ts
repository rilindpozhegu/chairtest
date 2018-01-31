import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  public backURL = 'http://chairappbackend.tk/api/';
  jwtTokenName = 'chairApp';

  constructor(private http: HttpClient, private _router: Router) { }


  login(data) {
    return this.http.post(this.backURL + 'login', data).map(res => res);
  }

  register(data) {
    return this.http.post(this.backURL + 'register', data).map(res => res);
  }

  getJWTToken() {
      if(localStorage.getItem(this.jwtTokenName) != null){
        return JSON.parse(localStorage.getItem(this.jwtTokenName));
      } else {
        return false;
      }
  }

  checkAuthentication():boolean {
    // Check if token exists
    if (localStorage.getItem(this.jwtTokenName) != null) {
      // Return true if it has not expired, return false if it has...
      return tokenNotExpired(this.jwtTokenName);
    }else {
      // return false in case token does not exist
      return false;
    }
  };
}

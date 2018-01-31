import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http:HttpClient, private _authenticationService:AuthenticationService) { }





  getUsers() {
    return this.http.get(this._authenticationService.backURL + 'users').map(res => res);
  }
}

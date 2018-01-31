import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';

@Injectable()
export class KlasService {

  constructor(private http:HttpClient, private _authenticationService:AuthenticationService) { }
  
  getKlasatFromFloor(floorNumber) {
    return this.http.get(this._authenticationService.backURL + 'floor/' + floorNumber).map(res => res);
  }

  getAllFloorKlasat(floorNumber) {
    return this.http.get(this._authenticationService.backURL + 'floor/' + floorNumber + '/all/klasat').map(res => res);
  }

  getKlasen(klasaId) {
    return this.http.get(this._authenticationService.backURL + 'klasa/' + klasaId).map(res => res);
  }

  takeChair(data) {
    return this.http.post(this._authenticationService.backURL + 'user/klasa/take/chair', data).map(res => res);
  }

  reportChair(data) {
    return this.http.post(this._authenticationService.backURL + 'user/klasa/report/chairs', data).map(res => res);
  }
}

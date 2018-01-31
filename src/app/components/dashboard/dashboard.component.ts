import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {KlasService} from "../../services/klas.service";
import { AuthenticationService} from "../../services/authentication.service";
import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  klasat;
  showClass = false;
  chosenKlasa:any;

  reportChairsData = {
    chairs: '',
    klasa_id: '',
  };

  successTakenChair = '';
  errors = '';

  chosenFloor:number;

  constructor(private _userService:UserService,
              private _klasService:KlasService,
              private _authenticationService:AuthenticationService, 
              private _router:Router) { 
            
              }

  ngOnInit() {
    if(!this._authenticationService.checkAuthentication()) {
      this._router.navigate(['/auth']);
    }



  }

  getKlasatFromFloor(floorNumber, refreshClass:boolean) {
    this.chosenFloor = floorNumber;

      this._klasService.getKlasatFromFloor(floorNumber).subscribe(
        res => {
          console.log(res);
          this.klasat = res[0];

          console.log('Klasat: ', this.klasat);
        }, error => {
          console.log('Error: ', error.error);
        }
      );

      if(refreshClass) {
        this.showKlasen(this.chosenKlasa.id);
      }
  }
 
  showKlasen(klasaId) {
    if(klasaId != null) {
      this._klasService.getKlasen(klasaId).subscribe(
        res => {
          this.showClass = true;
          this.chosenKlasa = res[0];
          console.log('Klasa:', this.chosenKlasa);
        }, error => {
          console.log('Error: ', error);
        }
      );
    }
  }

  takeChair(klasaId) {
    let data = {
      klasa_id: klasaId
    }

    this._klasService.takeChair(data).subscribe(
      res => {
        console.log(res);
        this.successTakenChair = 'Chair was taken successfully';
        console.log('Klasat: ', this.klasat);
        this.getKlasatFromFloor(this.chosenFloor, true);
      }, error => {
        this.errors = error.error;
        console.log('Error: ', error.error);
        this.getKlasatFromFloor(this.chosenFloor, true);
      }
    );
  }

  reportChairs({value, valid}) {

    this.reportChairsData.klasa_id = this.chosenKlasa.id;

    console.log('ReportChairsData: ', this.reportChairsData);

    this._klasService.reportChair(this.reportChairsData).subscribe(
      res => {
        console.log('RES: ', res);
        this.showKlasen(this.chosenKlasa.id);

        this.getKlasatFromFloor(this.chosenFloor, true);
      }, error => {
        console.log("Error: ", error);
        this.getKlasatFromFloor(this.chosenFloor, true);
      }
    );
  }

  refreshResults() {
    this.getKlasatFromFloor(this.chosenFloor, false);
  }
}

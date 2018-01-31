import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../../services/authentication.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginData = {
    email: '',
    password: '',
  };
  isLogged = false;
  loginResponse = '';

  registrationData = {
    email: '',
    password: '',
    password_confirmation: '',
  };
  registrationResponse = '';

  error = false;

  constructor(private _authenticationService:AuthenticationService, private _router:Router) {

  }

  ngOnInit() {
      
    if(this._authenticationService.checkAuthentication()) {
      this._router.navigate(['/']);
    }
  }

  onLogin() {
    this._authenticationService.login(this.loginData).subscribe(
      res => {
        console.log('Response: ', res);
        const jwtToken = res['jwt'];
        localStorage.setItem(this._authenticationService.jwtTokenName, JSON.stringify(jwtToken));




        if(this._authenticationService.checkAuthentication()) {
          setTimeout(set => {
            window.location.href = '/';
            // this._router.navigate(['/']);
          }, 500);
        }

      }, error => {

        this.loginResponse = "There was an issue with your request, check your credentials";

        setTimeout(set => {
          this.loginResponse = '';
          // this._router.navigate(['/']);
        }, 5000);


        this.error = error.error;
        console.log('Error: ', error);
      }
    );
  }

  onRegistration({value, valid}) {

    if(value.password != value.password_confirmation) {
      setTimeout(set => {
        this.registrationResponse = '';
        // this._router.navigate(['/']);
      }, 5000);
      return this.registrationResponse = "Password fields must match with each other.";
    }



    this._authenticationService.register(this.registrationData).subscribe(
      res => {
        console.log('Response: ', res);

        this.registrationResponse = 'Account Created Successfully. You can now login.';

        setTimeout(set => {
          this.registrationResponse = '';
          // this._router.navigate(['/']);
        }, 5000);


      }, error => {

        this.registrationResponse = error.error["message"];

        setTimeout(set => {
          this.registrationResponse = '';
          // this._router.navigate(['/']);
        }, 5000);

        this.error = error.error;
        console.log('Error: ', error);
      }
    );
  }

}

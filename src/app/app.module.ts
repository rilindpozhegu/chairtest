import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService} from "./services/user.service";
import { KlasService} from "./services/klas.service";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './components/authentication/authentication.component'
import { RouterModule, Routes } from '@angular/router';
import { RegistrationVerificationComponent } from './components/registration-verification/registration-verification.component';
import { AuthenticationService} from "./services/authentication.service";
// Authorization Interceptor
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { ReportChairsComponent } from './components/report-chairs/report-chairs.component';
import { CommonModule } from '@angular/common';

// Routes
const appRoutes: Routes = [
  {path:'auth',component:AuthenticationComponent},
  {path:'',component:DashboardComponent},
  {path:'report',component:ReportChairsComponent},
  {path:'registration/verify/:email/:token',component:RegistrationVerificationComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthenticationComponent,
    RegistrationVerificationComponent,
    ReportChairsComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  providers: [
    UserService,
    KlasService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

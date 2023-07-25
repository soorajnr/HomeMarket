import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OTPComponent } from './otp/otp.component';
import { LocationComponent } from './location/location.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
//import { HomeComponent } from './home/home.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
       { path: 'login', component: LoginComponent },
       { path: 'otp', component: OTPComponent },
       { path: 'location', component: LocationComponent },
       { path: 'home', component: HomeComponent },
       { path: 'details/:id', component: DetailsComponent },
       //{ path: 'home', component: HomeComponent },
       { path: '**', redirectTo: 'login' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

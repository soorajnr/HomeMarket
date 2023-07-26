import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { OTPComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { LocationComponent } from './location/location.component';
import { SellItemsComponent } from './sell-items/sell-items.component';
//import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OTPComponent,
    LocationComponent,
    SellItemsComponent
   // HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgOtpInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

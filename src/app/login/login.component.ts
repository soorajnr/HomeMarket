import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';
import { MatStepper } from '@angular/material/stepper';
import { coerceStringArray } from '@angular/cdk/coercion';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  //firstFormGroup: FormGroup = new FormGroup({});
  user: any = []; 
  userVar:any;
  isLinear = true;
  //stepper: any;
  validUser: any;
  verifiedOTP:any;
  otp!: any;
  OtpresponseData: any;
  UserResponseData: any;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;

  @ViewChild(MatStepper) stepper!: MatStepper;


  firstFormGroup = this._formBuilder.group({
    mobile: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required],
  });

  ThirdFormGroup = this._formBuilder.group({
    ThirdCtrl: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    

  }


  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '-',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  onOtpChange(otp:any) {
    this.otp = otp;
  
  }

  setVal(val:any) {
    this.ngOtpInput.setValue(val);
    console.log(val);
  }

  toggleDisable(){
    if(this.ngOtpInput.otpForm){
      if(this.ngOtpInput.otpForm.disabled){
        this.ngOtpInput.otpForm.enable();
      }else{
        this.ngOtpInput.otpForm.disable();
      }
    }
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }

goBack(){
    this.stepper.previous();
}

goForward(){
    this.stepper.next();
}
  GoOtp() {
    debugger;
    if (this.firstFormGroup.valid) {
      const mobile = this.firstFormGroup.get( 'mobile')!.value;
      console.log('Mobile Number:', mobile);
      this.http.post('http://127.0.0.1:8000/api/userdata/', { mobile: mobile })
        .subscribe((response: any) => {          
          this.userVar=response.user;
          this.UserResponseData = response;
          console.log('Response from server:', response);    
          
        }, (error: any) => {
          console.error('Error sending data to server:', error);
        });
    }
    this.stepper.next();
  }



  GoUserCheck(){ 
    
    if (this.secondFormGroup.valid) {
      const url = 'http://127.0.0.1:8000/api/verifyotp/';
      const body = { entered_otp: this.otp };  
      this.http.post(url, body,{ withCredentials: true }).subscribe(
        (response:any) => {
          console.log(response);
          this.OtpresponseData = response;  
          this.OtpValidUser();
        },
        (error) => {
          console.error(error);
        }
      );
      }  
  }

OtpValidUser(){
  if (this.OtpresponseData.success === false ) {
     this.toastr.error('Please Enter Valid OTP');
  } else if (this.OtpresponseData.success === true && this.UserResponseData.success === false) {   
    this.stepper.next();
    this.toastr.success('Otp Validated Successfully');
  } else {     
    this.router.navigate(['/', 'home']);
  }
}
  goToHome(){
    this.router.navigate(['/', 'home']);
  }



}

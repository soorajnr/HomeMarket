import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';
import { MatStepper } from '@angular/material/stepper';

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
  stepper: any;
  validUser: any;
  otp!: any;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;

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
    private router: Router
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

goBack(stepper: MatStepper){
    stepper.previous();
}

goForward(stepper: MatStepper){
    stepper.next();
}
  GoOtp(stepper: MatStepper) {
    debugger;
    if (this.firstFormGroup.valid) {
      const mobile = this.firstFormGroup.get( 'mobile')!.value;
      console.log('Mobile Number:', mobile);
      this.http.post('http://127.0.0.1:8000/api/userdata/', { name:"siva",mobile: mobile })
        .subscribe((response: any) => {          
          this.userVar=response.user;
          console.log('Response from server:', response);    
          localStorage.setItem('IsValidUser', response.success); 
          
        }, (error: any) => {
          console.error('Error sending data to server:', error);
        });
    }
    stepper.next();
  }

  GoUserCheck(stepper: MatStepper){
    this.validUser = localStorage.getItem('IsValidUser');
    if(this.validUser == "true") {
      this.router.navigate(['/', 'home']);
    }
    else{
      stepper.next();
    }
  }

  goToHome(stepper: MatStepper){
    this.router.navigate(['/', 'home']);
  }



}

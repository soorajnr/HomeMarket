import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  myForm: FormGroup = new FormGroup({});
  user: any = []; 
  userVar:any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.myForm = this.formBuilder.group({
      mobile: ['']
    });
  }

  GoOtp() {
    if (this.myForm.valid) {
      const mobile = this.myForm.get( 'mobile')!.value;
      console.log('Mobile Number:', mobile);

      // Send HTTP POST request to Django backend
      this.http.post('http://127.0.0.1:8000/api/userdata/', { name:"siva",mobile: mobile })
        .subscribe((response: any) => {
          debugger;
          this.userVar=response.user;
          console.log('Response from server:', response);
          // Perform any actions on the frontend based on the response
          // For example, you can navigate to the 'otp' page after successful submission
          
        }, (error: any) => {
          console.error('Error sending data to server:', error);
        });
    }
    this.router.navigate(['/', 'otp']);
  }
}

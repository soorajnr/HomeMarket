import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface Location {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  constructor(private router: Router) {
    // ...
  }
  Location: Location[] = [
    {value: 'thrissur-0', viewValue: 'hrissur'},
    {value: 'eranakulam-1', viewValue: 'eranakulam'},
    {value: 'kozhikode-2', viewValue: 'kozhikode'},
  ];

  mylatlng: any = {
    lat: null,
    lng: null
  };
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('latitude',position.coords.latitude);
        console.log('longitude',position.coords.longitude);
        this.mylatlng.lat = position.coords.latitude;
        this.mylatlng.lng = position.coords.longitude;
      });
      this.router.navigate(['/', 'home']);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}

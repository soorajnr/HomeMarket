import { Component } from '@angular/core';

interface Catagery {
  value: string;
  viewValue: string;
}
interface Location {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  Catagery: Catagery[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];


  Location: Location[] = [
    {value: 'thrissur-0', viewValue: 'Thrissur'},
    {value: 'eranakulam-1', viewValue: 'eranakulam'},
    {value: 'kozhikode-2', viewValue: 'kozhikode'},
  ];
}

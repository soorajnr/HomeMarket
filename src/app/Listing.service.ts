import { Injectable } from '@angular/core';
import { ListtingItems } from './ListtingItems';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
// export class ListingService {
//   readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

//   protected ListtingItemsList: ListtingItems[] = [
//     {
//       id: 0,
//       name: 'Acme Fresh Start Housing',
//       city: 'Chicago',
//       state: 'IL',
//       photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
//       availableUnits: 4,
//       wifi: true,
//       laundry: true,
//       price: 150,
//       Negotiable: "Negotiable"
//     },
//     {
//       id: 1,
//       name: 'A113 Transitional Housing',
//       city: 'Santa Monica',
//       state: 'CA',
//       photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
//       availableUnits: 0,
//       wifi: false,
//       laundry: true,
//       price: 150,
//       Negotiable: "Negotiable"
//     },
//     {
//       id: 2,
//       name: 'Warm Beds Housing Support',
//       city: 'Juneau',
//       state: 'AK',
//       photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
//       availableUnits: 1,
//       wifi: false,
//       laundry: false,
//       price: 150,
//       Negotiable: "Negotiable"
//     },
//     {
//       id: 3,
//       name: 'Homesteady Housing',
//       city: 'Chicago',
//       state: 'IL',
//       photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
//       availableUnits: 1,
//       wifi: true,
//       laundry: false,
//       price: 150,
//       Negotiable: "Negotiable"
//     },
//     {
//       id: 4,
//       name: 'Happy Homes Group',
//       city: 'Gary',
//       state: 'IN',
//       photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
//       availableUnits: 1,
//       wifi: true,
//       laundry: false,
//       price: 150,
//       Negotiable: "Negotiable"
//     },
//     {
//       id: 5,
//       name: 'Hopeful Apartment Group',
//       city: 'Oakland',
//       state: 'CA',
//       photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
//       availableUnits: 2,
//       wifi: true,
//       laundry: true,
//       price: 150,
//       Negotiable: "Negotiable"
//     },
//     {
//       id: 6,
//       name: 'Seriously Safe Towns',
//       city: 'Oakland',
//       state: 'CA',
//       photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
//       availableUnits: 5,
//       wifi: true,
//       laundry: true,
//       price: 150,
//       Negotiable: "Negotiable"
//     },
//     {
//       id: 7,
//       name: 'Hopeful Housing Solutions',
//       city: 'Oakland',
//       state: 'CA',
//       photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
//       availableUnits: 2,
//       wifi: true,
//       laundry: true,
//       price: 150,
//       Negotiable: "Negotiable"
//     },
//     {
//       id: 8,
//       name: 'Seriously Safe Towns',
//       city: 'Oakland',
//       state: 'CA',
//       photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
//       availableUnits: 10,
//       wifi: false,
//       laundry: false,
//       price: 150,
//       Negotiable: "Negotiable"
//     },
//     {
//       id: 9,
//       name: 'Capital Safe Towns',
//       city: 'Portland',
//       state: 'OR',
//       photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
//       availableUnits: 6,
//       wifi: true,
//       laundry: true,
//       price: 150,
//       Negotiable: "Negotiable"
//     }
//   ];

//   getAllListtingItems(): ListtingItems[] {
//     return this.ListtingItemsList;
//   }

//   getListtingItemsById(id: number): ListtingItems | undefined {
//     return this.ListtingItemsList.find(ListtingItems => ListtingItems.id === id);
//   }

//   submitApplication(firstName: string, lastName: string, email: string) {
//     console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
//   }
// }

export class ListingService {

  protected ListtingItemsList: ListtingItems[] = [];

  constructor(private http: HttpClient) { }

  getProduct(): Observable<ListtingItems[]> {
    
    return this.http.get<ListtingItems[]>('http://127.0.0.1:8000/product/allproduct/');
    debugger;
  }

  getAllListtingItems(): ListtingItems[] {
    return this.ListtingItemsList;
  }

  getListtingItemsById(id: number): ListtingItems | undefined {
    return this.ListtingItemsList.find(ListtingItems => ListtingItems.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}

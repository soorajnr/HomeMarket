import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListtingItems } from '../ListtingItems';
import { ListingService } from '../Listing.service';
import { MaterialModule } from '../material.module';
import { OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
interface Location {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

// export class HomeComponent {
//   selected = 'thrissur-0';

//   ListtingItemsList: ListtingItems[] = [];
//   housingService: ListingService = inject(ListingService);
//   filteredLocationList: ListtingItems[] = [];
//   constructor() {
//     this.ListtingItemsList = this.housingService.getAllListtingItems();
//     this.filteredLocationList = this.ListtingItemsList;
//   }
//   filterResults(text: string) {
//     if (!text) {
//       this.filteredLocationList = this.ListtingItemsList;
//     }

//     this.filteredLocationList = this.ListtingItemsList.filter(
//       ListtingItems => ListtingItems?.name.toLowerCase().includes(text.toLowerCase())
//     );
//   }
//   Location: Location[] = [
//     {value: 'thrissur-0', viewValue: 'Thrissur'},
//     {value: 'eranakulam-1', viewValue: 'eranakulam'},
//     {value: 'kozhikode-2', viewValue: 'kozhikode'},
//   ];

// }
export class HomeComponent implements OnInit {
 // @Input() item!: ListtingItems;
  selected = 'thrissur-0';
  ListtingItemsList: ListtingItems[] = [];
  categorizedItems: { [category: number]: ListtingItems[] } = {};
  isItemsAvailable: boolean = false;
  housingService: ListingService = inject(ListingService);
  //filteredLocationList: ListtingItems[] = [];
  constructor(private listingService: ListingService) { }

  ngOnInit() {
    this.listingService.getProduct().subscribe(
      (data: ListtingItems[]) => {
        this.ListtingItemsList = data;
        this.isItemsAvailable = true; 
        this.groupCategories();
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isItemsAvailable = false; // Set the flag to false when items are not available
      }
    );
  }

  groupCategories() {
    debugger;
    this.categorizedItems = {}; // Reset the categorizedItems object
    this.ListtingItemsList.forEach((item) => {
      if (!this.categorizedItems[item.category]) {
        this.categorizedItems[item.category] = [];
      }
      this.categorizedItems[item.category].push(item);
    });
  }

    filterResults(text: string) {
    if (!text) {
      this.ListtingItemsList = this.ListtingItemsList;
    }

    this.ListtingItemsList = this.ListtingItemsList.filter(
      ListtingItems => ListtingItems?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
  Location: Location[] = [
    {value: 'thrissur-0', viewValue: 'Thrissur'},
    {value: 'eranakulam-1', viewValue: 'eranakulam'},
    {value: 'kozhikode-2', viewValue: 'kozhikode'},
  ];
}







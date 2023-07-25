import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListtingItemsComponent } from '../Listing/Item.component';
import { ListtingItems } from '../ListtingItems';
import { ListingService } from '../Listing.service';
import { MaterialModule } from '../material.module';

interface Location {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ListtingItemsComponent,
    MaterialModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  selected = 'thrissur-0';

  ListtingItemsList: ListtingItems[] = [];
  housingService: ListingService = inject(ListingService);
  filteredLocationList: ListtingItems[] = [];
  constructor() {
    this.ListtingItemsList = this.housingService.getAllListtingItems();
    this.filteredLocationList = this.ListtingItemsList;
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.ListtingItemsList;
    }

    this.filteredLocationList = this.ListtingItemsList.filter(
      ListtingItems => ListtingItems?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
  Location: Location[] = [
    {value: 'thrissur-0', viewValue: 'Thrissur'},
    {value: 'eranakulam-1', viewValue: 'eranakulam'},
    {value: 'kozhikode-2', viewValue: 'kozhikode'},
  ];

}

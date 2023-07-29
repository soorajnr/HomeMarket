import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListtingItems } from '../ListtingItems';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  templateUrl: './Item.component.html',
  styleUrls: ['./Item.component.scss'],
  
})

export class ListtingItemsComponent {

  @Input() ListtingItems!: ListtingItems;

}

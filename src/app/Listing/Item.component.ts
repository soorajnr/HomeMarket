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
  template: `
  
                <mat-card class="example-card">
                  <!-- <p class="flag">{{ListtingItems.Negotiable}}</p>                  -->
                  <!-- <div mat-card-image class="bg-img-1" [ngStyle]="{ 'background-image': 'url(' + ListtingItems.photo + ')' }"></div> -->

                  <div mat-card-image class="bg-img-1" style="background: url({{ListtingItems.photo}});"></div>              
                  <mat-card-content class="mx-2">
                    <h2 class="mb-1 mt-3 text-truncate">{{ListtingItems.name}}</h2>
                    <!-- <p class="text-truncate">{{ ListtingItems.city}}, {{ListtingItems.state }}</p> -->
                  </mat-card-content>
                  <mat-card-actions class="m-3 d-flex justify-content-between">
                    <button mat-raised-button color="primary" [routerLink]="['/details', ListtingItems.id]">Buy Now</button>
                    <button mat-button color="warn"><h2 class="mb-0">Rs. {{ListtingItems.price}}</h2></button>
                  </mat-card-actions>
                </mat-card>
             
  
  `,
  styleUrls: ['./Item.component.scss'],
})

export class ListtingItemsComponent {

  @Input() ListtingItems!: ListtingItems;

}

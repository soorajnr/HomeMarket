import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id:number;
  name:string;
}

  interface Category {
    // Define the structure of the Category interface here
    // For example:
    id: number;
    category: string;
    // Add other p
}
@Component({
  selector: 'app-sell-items',
  templateUrl: './sell-items.component.html',
  styleUrls: ['./sell-items.component.scss']
})
export class SellItemsComponent implements OnInit {
  Catogeries: Category[] = [];
  Users: User[] = [];
  ProductForm: FormGroup = new FormGroup({});
  
  // user: any = []; 
 
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategory();
    this.getUser();
    this.ProductForm = this.formBuilder.group({
    name: [''],
    seller: [''],
    price: [''],
    description: [''],
    category: [''],
    photo: [''],
    location : [''],
    // quantity: [''],
    date_added: [''],
    fixed_price: [''],
    // negotiable_price: ['']

    });
  }



  getUser(): void {
    const url = 'http://127.0.0.1:8000/api/users/'; // Replace this with the actual API endpoint URL
    this.http.get<User[]>(url).subscribe(
      (data) => {
        this.Users = data;
        console.log(data); // You can see the data in the browser console
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
    }
  
  getCategory(): void {
    const url = 'http://127.0.0.1:8000/product/allcategory/'; // Replace this with the actual API endpoint URL
    this.http.get<Category[]>(url).subscribe(
      (data) => {
        this.Catogeries = data;
        console.log(data); // You can see the data in the browser console
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
    }
  saveProduct() {
    
    if (this.ProductForm.valid) {
      const name = this.ProductForm.get( 'name',)!.value;
      // const seller = this.ProductForm.get( 'name',)!.value;
      const price = this.ProductForm.get( 'price',)!.value;
      const location = this.ProductForm.get( 'location',)!.value;
      const description = this.ProductForm.get( 'description',)!.value;
      // const quantity = this.ProductForm.get( 'quantity',)!.value;
      const category = this.ProductForm.get( 'category',)!.value;
      const seller = this.ProductForm.get( 'seller',)!.value;
      const photo = this.ProductForm.get( 'photo',)!.value;
      console.log('product:', name);

      // Send HTTP POST request to Django backend
      this.http.post('http://127.0.0.1:8000/product/productUpdate/', {
      name:name,
      seller: seller,
      price:price,
      category:category,
      description:description,
      photo: this.urls,
      location : location,
      // quantity: "quantity",
      // fixed_price: "fixed_price",
      // negotiable_price: "negotiable_price",
      
    
    
    })
        .subscribe((response: any) => {
          
          console.log('Response from server:', response);
          // Perform any actions on the frontend based on the response
          // For example, you can navigate to the 'otp' page after successful submission
          
        }, (error: any) => {
          console.error('Error sending data to server:', error);
        });
    }
    // this.router.navigate(['/', 'otp']);
  }

  urls = new Array<string>();

   @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose Images';
  uploadFileEvt(imgFile: any) {
    debugger
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' , ';
      });
      // HTML5 FileReader API
      this.urls = [];
      let files = imgFile.target.files;
      let reader = new FileReader();
      if (files) {
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
          }
          reader.readAsDataURL(file);
        }
      }
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose Images';
    }
  }
}

 


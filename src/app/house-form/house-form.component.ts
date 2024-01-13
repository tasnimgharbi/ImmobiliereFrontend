import { Component } from '@angular/core';
import { HouseService } from '../house.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-house-form',
  templateUrl: './house-form.component.html',
  styleUrls: ['./house-form.component.css']
})
export class HouseFormComponent {
  house: any = {
    title: '',
    description: '',
    price: 0,
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    amenities: [],
    category: '',
    type: '',
    postedBy: ''
  };

  selectedFiles: File[] = [];

  constructor(private houseService: HouseService, private router: Router) {
    const userId = localStorage.getItem('userid');
    if (userId) {
      this.house.postedBy = userId;
    }
  }

  onFileChanged(event: any) {
    this.selectedFiles = event.target.files;
    console.log('Selected files:', this.selectedFiles);
    console.log(this.house.type);
  }

  onSubmit() {
    if (this.selectedFiles.length === 0) {
      alert('No images uploaded');
      return;
    }

    const formData = new FormData();

    formData.append('title', this.house.title);
    formData.append('description', this.house.description);
    formData.append('price', this.house.price.toString());
    formData.append('location', this.house.location);
    formData.append('bedrooms', this.house.bedrooms.toString());
    formData.append('bathrooms', this.house.bathrooms.toString());
    formData.append('size', this.house.size.toString());
    formData.append('amenities', JSON.stringify(this.house.amenities));
    formData.append('category', this.house.category);
    formData.append('type', this.house.type);
    formData.append('postedBy', this.house.postedBy);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append(`image${i}`, this.selectedFiles[i]);
    }
    
    this.houseService.addHouse(formData).subscribe(
      response => {
        console.log('House added successfully:', response);
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Error adding house:', error);
        alert('Failed to add the house. Please try again.');
      }
    );
  }
}

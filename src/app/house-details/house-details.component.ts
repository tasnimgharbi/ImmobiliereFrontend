import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from '../house.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {
  @Input() images: string[] = [];
  house: any;
  loggedInUserId: string | null = localStorage.getItem('userid');
  backendBaseUrl = 'http://localhost:8000';
  selectedImages: File[] = [];
  isAdmin: boolean = false;

  updatedHouse: any = {};
  postedByUser: any;

  showUpdateModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  
  ) { }
 
  currentSlide = 0;
  

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.house.images.length) % this.house.images.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.house.images.length;
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.route.paramMap.subscribe(params => {
      const houseId = params.get('id');
      if (houseId) {
        this.fetchHouseDetails(houseId);
      }
    });
  }
  cancelUpdate() {

    this.location.back(); 
  }
  fetchHouseDetails(houseId: string): void {
    this.houseService.getHouseById(houseId).subscribe((data: any) => {
      this.house = data.house;
  
      if (this.house && this.house.postedBy) {
        this.authService.getUserDetails(this.house.postedBy).subscribe((userData: any) => {
          this.postedByUser = userData.user;
          console.log('Posted by user details:', this.postedByUser);
        });
      }
  
      if (this.house && this.house.images) {
        this.house.images = this.house.images.map((image: string) => `${this.backendBaseUrl}${image}`);
      }
    });
  }
  
  isOwner(): boolean {
    return this.house?.postedBy === this.loggedInUserId;
  }
  onFileChanged(event: any) {
    this.selectedImages = event.target.files;
    console.log('Selected files:', this.selectedImages);
    console.log(this.selectedImages);
  }

  openUpdateModal(): void {
    this.updatedHouse = { ...this.house };
    console.log(this.showUpdateModal);
    this.showUpdateModal = true;
    console.log(this.showUpdateModal);
  }

  closeUpdateModal(): void {
    this.updatedHouse = {};
    this.showUpdateModal = false;
  }

  onSubmitUpdateForm(): void {
    this.houseService.updateHouse(this.house._id, {
      title: this.updatedHouse.title,
      description: this.updatedHouse.description,
      price: this.updatedHouse.price,
      location: this.updatedHouse.location,
      bedrooms: this.updatedHouse.bedrooms,
      bathrooms: this.updatedHouse.bathrooms,
      size: this.updatedHouse.size,
      category: this.updatedHouse.category,
      type: this.updatedHouse.type,
      amenities: this.updatedHouse.amenities,
    }).subscribe((response: any) => {
      console.log('House details updated successfully:', response);
      this.closeUpdateModal();
      this.fetchHouseDetails(this.house._id);
    }, (error) => {
      console.error('Error updating house details:', error);
    });
  }
  deleteHouse(houseId: string): void {
    if (confirm('Are you sure you want to delete this house?')) {
      this.houseService.deleteHouse(houseId).subscribe(
        (response: any) => {
          console.log(response);
          if (this.isOwner()) {
            this.router.navigate(['/profile']);
          } else if (this.isAdmin) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error: any) => {
          console.error('Error deleting house:', error);
        }
      );
    }
  }
  
  uploadImages(): void {
    if (this.selectedImages.length > 0) {
      this.houseService.uploadHouseImages(this.house._id, this.selectedImages).subscribe(
        (response: any) => {
          console.log('Images uploaded successfully:', response);
          this.fetchHouseDetails(this.house._id);
        },
        (error) => {
          console.error('Error uploading images:', error);
        }
      );
    }
  }
}

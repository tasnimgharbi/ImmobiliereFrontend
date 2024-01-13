import { Component, Input, OnInit } from '@angular/core';
import { HouseService } from '../house.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  houses: any[] = [];
  backendBaseUrl = 'http://localhost:8000'; 
  


  @Input() filterByUserId: boolean = false;
  @Input() userId: string | undefined;
  isAdmin: boolean = false;
  isOwner: boolean = false;


  constructor(private houseService: HouseService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    
    if (this.filterByUserId && this.userId) { 
      this.fetchUserHouses(this.userId);
    } else {
      this.fetchAllHouses();
    }
  }

  fetchUserHouses(userId: string): void {
    this.houseService.getAllHouses().subscribe((data: any) => {
      this.houses = data.houses
        .filter((house: any) => house.postedBy === userId)
        .map((house: any) => ({
          ...house,
          images: house.images.map((image: string) => `${this.backendBaseUrl}${image}`)
        }));
        
      console.log(this.houses);
    });
  }
  
  fetchAllHouses(): void {
    this.houseService.getAllHouses().subscribe((data: any) => {
      this.houses = data.houses.map((house: any) => ({
        ...house,
        images: house.images.map((image: string) => `${this.backendBaseUrl}${image}`)
      }));

      console.log(this.houses);
    });
  }
  handleCardClick(house: any): void {
    console.log('Card clicked - House Details:', house);
    this.router.navigate([`/house/${house._id}`]);
  }
  
  deleteHouse(houseId: string): void {
    if (confirm('Are you sure you want to delete this house?')) {
      this.houseService.deleteHouse(houseId).subscribe(
        (response: any) => {
          console.log(response);
          this.houses = this.houses.filter((house) => house._id !== houseId);
        },
        (error: any) => {
          console.error('Error deleting house:', error);
        }
      );
    }
  }
}

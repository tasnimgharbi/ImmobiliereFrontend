import { Component, OnInit } from '@angular/core';
import { HouseService } from '../house.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: any[] = [];
  filteredHouses: any[] = [];
  featuredHouses: any[] = [];
  selectedCategory: string | undefined;
  selectedType: string | undefined;
  backendBaseUrl = 'http://localhost:8000'; 

  constructor(private houseService: HouseService, private router: Router) { }

  ngOnInit(): void {
    this.fetchFeaturedHouses();

    this.fetchAllHouses();
  }


  fetchFeaturedHouses(): void {
    this.houseService.getAllHouses().subscribe(
      (data: any) => {
        this.houses = data.houses.map((house: any) => ({
          ...house,
          images: house.images.map((image: string) => `${this.backendBaseUrl}${image}`)
        }));

        this.houses.sort((a, b) => b.price - a.price);

        this.featuredHouses = this.houses.slice(0, 4);
      },
      (error) => {
        console.error('Error fetching houses:', error);
      }
    );
  }

  fetchAllHouses(): void {
    this.houseService.getAllHouses().subscribe(
      (data: any) => {
        this.houses = data.houses.map((house: any) => ({
          ...house,
          images: house.images.map((image: string) => `${this.backendBaseUrl}${image}`)
        }));
        this.filteredHouses = this.houses;
      },
      (error) => {
        console.error('Error fetching houses:', error);
      }
    );
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.houses.map(house => house.category))];
  }

  getUniqueTypes(): string[] {
    return [...new Set(this.houses.map(house => house.type))];
  }

  handleCardClick(house: any): void {
    console.log('Card clicked - House Details:', house);
    this.router.navigate([`/house/${house._id}`]); 
  }
}

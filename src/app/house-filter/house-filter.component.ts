import { Component, OnInit } from '@angular/core';
import { HouseService } from '../house.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-filter',
  templateUrl: './house-filter.component.html',
  styleUrls: ['./house-filter.component.css']
})
export class HouseFilterComponent implements OnInit {
  houses: any[] = [];
  filteredHouses: any[] = [];
  categories: string[] = [];
  types: string[] = [];
  backendBaseUrl = 'http://localhost:8000';

  selectedCategory: string | undefined;
  selectedType: string | undefined;
  searchLocation: string = ''; 

  constructor(private houseService: HouseService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAllHouses(); 
  }

  fetchAllHouses(): void {
    this.houseService.getAllHouses().subscribe(
      (response) => {
        this.houses = response.houses
          .map((house: any) => ({
            ...house,
            images: house.images.map((image: string) => `${this.backendBaseUrl}${image}`)
          }));

        this.filterHousesByLocation();
        this.extractCategoriesAndTypes();
      },
      (error) => {
        console.error('Error fetching all houses:', error);
      }
    );
  }
  submitSearch(): void {
    this.houseService.setSearchLocation(this.searchLocation);
    this.filterHousesByLocation();
  }

  filterHousesByLocation(): void {
    const searchLocation = this.houseService.getSearchLocation();

    if (searchLocation) {
      this.filteredHouses = this.houses.filter(house =>
        house.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    } else {
      this.filteredHouses = [...this.houses];
    }
  }

  handleCardClick(house: any): void {
    console.log('Card clicked - House Details:', house.type);
    this.router.navigate([`/house/${house._id}`]); 
  }

  private extractCategoriesAndTypes(): void {
    this.categories = [...new Set(this.houses.map(house => house.category))];
    this.types = [...new Set(this.houses.map(house => house.type))];
  }

  filterHouses(): void {
    this.filteredHouses = this.houses.filter(house =>
      (!this.selectedCategory || house.category === this.selectedCategory) &&
      (!this.selectedType || house.type === this.selectedType)
    );
  }
  
}

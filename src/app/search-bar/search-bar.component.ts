
import { Component, Output, EventEmitter } from '@angular/core';
import { HouseService } from '../house.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchLocation: string = ''; 

  constructor(private houseService: HouseService, private router: Router) {}

  search(): void {

    this.houseService.setSearchLocation(this.searchLocation);
    this.router.navigate(['/filter']);
  }
}

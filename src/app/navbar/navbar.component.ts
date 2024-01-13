import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
  
    this.isAdmin = this.authService.isAdmin();

  }

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logoutUser();
    this.isAdmin= false;

   
  }



}

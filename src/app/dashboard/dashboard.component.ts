
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   
    this.authService.getUsers().subscribe(
      (data: any) => {
        this.users = data.users;
        console.log(this.users)
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    this.authService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter(user => user._id !== userId);
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }
}

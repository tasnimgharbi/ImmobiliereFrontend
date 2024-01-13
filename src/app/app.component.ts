import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'front';
  public userid = '';
  public username: string | null = '';



constructor(private authService: AuthService, private router: Router) { }


ngOnInit(): void {

  this.username = this.authService.getUsername();
    console.log(this.username);
}

}

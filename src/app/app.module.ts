import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HouseFormComponent } from './house-form/house-form.component';
import { HouseListComponent } from './house-list/house-list.component';
import {MatCardModule} from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { HouseFilterComponent } from './house-filter/house-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHousesComponent } from './admin-houses/admin-houses.component';
import { BlogComponent } from './blog/blog.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HouseFormComponent,
    HouseListComponent,
    NavbarComponent,
    UserProfileComponent,
    HouseDetailsComponent,
    HouseFilterComponent,
    DashboardComponent,
    AdminHousesComponent,
    BlogComponent,
    SearchBarComponent,
    FooterComponent
  ],
  imports: [
   
    BrowserModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,MatMenuModule,
 
    
  ],
  providers: [AuthService,AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

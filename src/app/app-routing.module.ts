import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './auth.guard';
import { HouseFormComponent } from './house-form/house-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { HouseFilterComponent } from './house-filter/house-filter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHousesComponent } from './admin-houses/admin-houses.component';

const routes: Routes = [
  {path:"",component:HomeComponent}, 
  {path:"login",component:LoginComponent}, 
  {path:"addhouse",component:HouseFormComponent},
  {path:"profile",component:UserProfileComponent},
  {path: 'house/:id', component: HouseDetailsComponent },
  {path: "filter", component: HouseFilterComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: 'adminhouses', component: AdminHousesComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

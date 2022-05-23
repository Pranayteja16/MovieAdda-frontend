import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { BookingsComponent } from './bookings/bookings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SeatlayoutComponent } from './seatlayout/seatlayout.component';
import { SignupComponent } from './signup/signup.component';
import { TheatersComponent } from './theaters/theaters.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login' ,component:LoginComponent},
  {path:'signup' ,component:SignupComponent},
  {path:'location' ,component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'movies' ,component:MoviesComponent, canActivate:[AuthGuard]},
  {path:'theaters' ,component:TheatersComponent, canActivate:[AuthGuard]},
  {path:'seatlayout' ,component:SeatlayoutComponent, canActivate:[AuthGuard]},
  {path:'reservation' ,component:ReservationComponent, canActivate:[AuthGuard]},
  {path: 'home' , component:HomeComponent, canActivate:[AuthGuard]},
  {path: 'bookings' , component:BookingsComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }

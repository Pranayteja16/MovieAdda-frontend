import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { TheatersComponent } from './theaters/theaters.component';
import { SeatlayoutComponent } from './seatlayout/seatlayout.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { BookingsComponent } from './bookings/bookings.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MoviesComponent,
    TheatersComponent,
    SeatlayoutComponent,
    HomeComponent,
    ReservationComponent,
    BookingsComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }

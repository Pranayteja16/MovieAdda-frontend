import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from '../components/bookings/bookings.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HomeComponent } from '../components/home/home.component';
import { AdminauthGuard } from '../guards/adminauth.guard';
import { AuthGuard } from '../guards/auth.guard';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AddshowtimeComponent } from './addshowtime/addshowtime.component';
import { AddtheaterComponent } from './addtheater/addtheater.component';
import { AdminbookingsComponent } from './adminbookings/adminbookings.component';


const routes: Routes = [
  {path:'addlocation' ,component:AddlocationComponent,canActivate:[AuthGuard, AdminauthGuard]},
  {path:'addmovie' ,component:AddmovieComponent,canActivate:[AuthGuard, AdminauthGuard]},
  {path:'addtheater' ,component:AddtheaterComponent,canActivate:[AuthGuard, AdminauthGuard]},
  {path:'addshowtime' ,component:AddshowtimeComponent,canActivate:[AuthGuard, AdminauthGuard]},
  {path: 'allbookings' , component:AdminbookingsComponent, canActivate:[AuthGuard, AdminauthGuard]},
  {path: 'adminhome' , component:HomeComponent, canActivate:[AuthGuard, AdminauthGuard]},
  {path: 'adminlocation' , component:DashboardComponent, canActivate:[AuthGuard, AdminauthGuard]},
  {path: 'adminmybookings' , component:BookingsComponent, canActivate:[AuthGuard, AdminauthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

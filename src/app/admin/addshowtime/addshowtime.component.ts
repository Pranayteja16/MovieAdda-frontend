import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { BookingService } from 'src/app/Services/booking.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-addshowtime',
  templateUrl: './addshowtime.component.html',
  styleUrls: ['./addshowtime.component.css']
})
export class AddshowtimeComponent implements OnInit {

  locations_list:any=[]
  movies_list:any=[]
  theaters_list:any=[]
  shows:any=[]


  locationform=new FormGroup({
    location: new FormControl('')
  })

  movieform=new FormGroup({
    movie: new FormControl('')
  })
  showtimeform=new FormGroup({
    showtiming: new FormControl(''),
    movie: new FormControl(''),
    theater: new FormControl('')
  })
  
  constructor(public bookingservice:BookingService, public adminservice:AdminService,public router:Router,public notifyservice:NotificationService) { }


onlocation(){
  console.log(this.locationform.value.location)
  this.movies_list=[]
  this.bookingservice.getmovies(this.locationform.value.location).subscribe({next:(response:any) =>{ 
    console.log(response)
      for(let movie of response){
        this.movies_list.push(movie.title)
      }
      console.log(this.movies_list)
    }
    })
}
onmovie(){
  console.log("selected movie is : ", this.movieform.value.movie)
  console.log(this.movieform.value)
  this.theaters_list=[]
  this.bookingservice.gettheaters(this.movieform.value.movie,this.locationform.value.location).subscribe({next:(response:any) =>{ 
    console.log(response)
      for(let theater of response){
        this.theaters_list.push(theater.theater)
      }
      console.log(this.theaters_list)
    }
    })
}
onshowtime(){
  console.log(this.showtimeform.value)
  let details={
    showtiming: this.showtimeform.value.showtiming,
    theater: this.showtimeform.value.theater,
    movie: this.movieform.value.movie,
    location: this.locationform.value.location,
    seats:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    seatsavailable:75,
    ticketprice:100
  }
  this.adminservice.addshowtime(details).subscribe({next:(response:any) =>{ 
    if(response && response['status']=='ok'){
      console.log(response)
      this.notifyservice.showSuccess("Showtime Added Successfully")
      this.shows.push(response['data'])
    }else{
      console.log("Error occured in adding Showtime")
      this.notifyservice.showError("Error Occured")
    }
    }
    })
}
ondelete(location:any,movie:any,theater:any,showtiming:any){
  try{
    this.adminservice.deleteshows(location,movie,theater,showtiming).subscribe({next:(res:any)=>{
      if(res && res['status']=='ok'){
      console.log("Deleted Show succesfully")
      this.notifyservice.showSuccess("Deleted Show Successfully")
      this.adminservice.allshows().subscribe({next:(res:any)=>{
        this.shows=res
      }})
      }else{
        console.log("Error occured in deleting show")
        this.notifyservice.showError("Error Occured")
      }
    }})
  }catch{
    console.log("Error occured")
  }
  try{
    this.adminservice.deletebookingbylocmovtheshow(location,movie,theater,showtiming).subscribe({next:(res:any)=>{
      if(res && res['status']=='ok'){
      console.log("Deleted bookings succesfully")
      }else{
        console.log("Error occured in deleting bookings")
        this.notifyservice.showError("Error Occured")
      }
    }})
  }catch{
    console.log("Error occured")
  }

}
  ngOnInit(): void {
    this.adminservice.getlocations().subscribe({next:(res:any)=>{

      console.log(res)
      for(let location of res){
        this.locations_list.push(location.location)
      }
      console.log(this.locations_list)
    }
    })
    this.adminservice.allshows().subscribe({next:(res:any)=>{
      this.shows=res
    }})
  }
  get showtiming(){
    return this.showtimeform.get('showtiming')
  }
  get movie(){
    return this.showtimeform.get('movie')
  }
}

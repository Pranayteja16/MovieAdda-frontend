import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { BookingService } from 'src/app/Services/booking.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-addtheater',
  templateUrl: './addtheater.component.html',
  styleUrls: ['./addtheater.component.css']
})
export class AddtheaterComponent implements OnInit {

  locations_list: any=[]
  movies_list: any=[]

  theaters:any=[]

  locationform=new FormGroup({
    location: new FormControl('')
  })
  theaterform=new FormGroup({
    title: new FormControl(''),
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
ontheater(){
  const details={
    title:this.theaterform.value.title,
    theater:this.theaterform.value.theater,
    location:this.locationform.value.location,
    
  }
  this.adminservice.addtheater(details).subscribe({next:(res:any)=>{
    if(res && res['status']=='ok'){
      console.log(res)
      console.log("Added theater: " , res['data']['theater'])
      this.theaters.push(res['data'])
      this.notifyservice.showSuccess("Theater Added Successfully")
      this.router.navigate(['/addtheater'])
    }else{
    console.log("Error occured in adding theater")
    this.notifyservice.showError("Error Occured")

  }
  }
})
}
ondelete(location:any,movie:any,theater:any){
  try{
    this.adminservice.deletetheater(location,movie,theater).subscribe({next:(res:any)=>{
      if(res && res['status']=='ok'){
      console.log("Deleted Theater succesfully")
      this.notifyservice.showSuccess("Deleted Theater Successfully")
      this.adminservice.alltheaters().subscribe({next:(res:any)=>{
        this.theaters=res
      }})
      }else{
        console.log("Error occured in deleting theater")
        this.notifyservice.showError("Error Occured")
      }
    }})
  }catch{
    console.log("Error occured")
  }
  try{
    this.adminservice.deleteshowsbylocmovthe(location,movie,theater).subscribe({next:(res:any)=>{
      if(res && res['status']=='ok'){
      console.log("Deleted shows succesfully")
      }else{
        console.log("Error occured in deleting shows")
        this.notifyservice.showError("Error Occured")
      }
    }})
  }catch{
    console.log("Error occured")
  }
  try{
    this.adminservice.deletebookingbylocmovthe(location,movie,theater).subscribe({next:(res:any)=>{
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
    this.adminservice.alltheaters().subscribe({next:(res:any)=>{
      this.theaters=res
    }})
  }
  get theater(){
    return this.theaterform.get('theater')
  }
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css']
})
export class TheatersComponent implements OnInit {

theaters_list:any=[]
images_list:any=[]
shows_list:any=[]
movie_selected:any=localStorage.getItem('movie')
location_selected:any=localStorage.getItem('location')
theater_selected:any
showtiming_selected:any

theaterform= new FormGroup({
  theater : new FormControl('')
})
showsform= new FormGroup({
  showtiming : new FormControl('')
})

  constructor(public bookingservice:BookingService,public router:Router) { }

ontheater(){
  console.log(this.theaters_list)
  console.log(this.theaterform.value)
  this.bookingservice.searchtheater(this.theaterform.value).subscribe({next:(res) =>{ 
    if(res && res['status']=="ok"){
      console.log("Selected theater is :" , res);
      this.theater_selected=(res['data']['theater'])
      console.log("Selected theater :" , this.theater_selected);
      // this.bookingservice.settheater(this.theater_selected)
      localStorage.setItem('theater' , this.theater_selected)

      this.bookingservice.getshows(localStorage.getItem('theater') , localStorage.getItem('movie'), localStorage.getItem('location'))
      .subscribe({next:(response:any) =>{
        this.shows_list=[]
        console.log(response)
        for(let item of response){
          this.shows_list.push(item.showtiming)
        }
      }
    })

      }else if(res['status']=="false"){
        console.log("Theater not found")
        alert("Theater not found")

      }
    },error:(err) =>{
      console.log("Error Occured")
      alert("Error Occured")
    }
  })
}


onshows(){
 
  this.bookingservice.getshow(localStorage.getItem('movie') , localStorage.getItem('theater'), localStorage.getItem('location'),this.showsform.value.showtiming)
  .subscribe({next:(res:any)=>{
    this.showtiming_selected=this.showsform.value.showtiming
    for(let item of res){
    localStorage.setItem('showid',item._id)
    
    console.log(res)
    console.log(this.bookingservice.getshowid())
    }
   
  }})
}

onselect(){
  this.router.navigate(['/seatlayout'])
}

  ngOnInit(): void {
    this.bookingservice.gettheaters(localStorage.getItem('movie'), localStorage.getItem('location')).subscribe({next:(res:any)=>{
      console.log(res)
        for(let theater of res){
          this.theaters_list.push(theater.theater)
          this.images_list.push(theater.image)
        }
    }
    })
  }

  get theater(){
    return this.theaterform.get('theater')
  }
}

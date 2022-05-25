import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/Services/apicall.service';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  locations_list:any=[]
  image_list:any=[]
  
  locationform= new FormGroup({
    location : new FormControl('')
  })

  dashboardform= new FormGroup({})

  constructor(public apicallservice : ApicallService, public bookingservice:BookingService,public router:Router) { }

  



  onlocation(){
    this.bookingservice.searchlocation(this.locationform.value).subscribe({next:(res) =>{ 
      if(res && res['status']=="ok"){
        console.log("Selected location is :" , res);
        const location=(res['data']['location'])
        console.log("Selected location :" , location);
        localStorage.setItem('location',location)
        this.router.navigate(['/movies'])

      }else if(res['status']=="false"){
        console.log("Location not found")
        alert("Location not found")
        
      }
    },error:(err)=>{
      console.log("Error Occured")
      alert("Error Occured")
    }
    })

  }
  ngOnInit(): void {
    this.bookingservice.getalllocations().subscribe({next:(res:any) =>{
      console.log(res)
      for(let item of res){
        this.locations_list.push(item.location)
        this.image_list.push(item.image)
      }

    }})

  }
  get location(){
    return this.locationform.get('location')
  }

}

import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-adminbookings',
  templateUrl: './adminbookings.component.html',
  styleUrls: ['./adminbookings.component.css']
})
export class AdminbookingsComponent implements OnInit {

  reservations:any=[]
  constructor(private adminservice:AdminService,public notifyservice:NotificationService) { }

  ondelete(location:any,movie:any,theater:any,showtiming:any,seats:any){
    console.log(seats)
    try{
      this.adminservice.deletebooking(location,movie,theater,showtiming,seats).subscribe({next:(res:any)=>{
        if(res && res['status']=='ok'){
        console.log("Deleted Booking succesfully")
        this.notifyservice.showSuccess("Deleted Booking Successfully")
        this.adminservice.allbookings().subscribe({next:(res:any)=>{
          this.reservations=res
        }})
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
    this.adminservice.allbookings().subscribe({next:(res:any)=>{
      console.log(res)
      this.reservations=res
      console.log(this.reservations)
    }})
  }

}

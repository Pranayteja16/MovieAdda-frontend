import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  reservations:any=[]
  constructor(private bookingservice:BookingService) { }


  ngOnInit(): void {
    this.bookingservice.getreservations(localStorage.getItem('email')).subscribe({next:(res:any)=>{
      console.log(res)
      this.reservations=res
      console.log(this.reservations)
    }})
  }

}

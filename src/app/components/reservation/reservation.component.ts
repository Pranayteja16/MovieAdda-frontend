import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservation:any
  seats_booked: any;
  seats: any;
  showtiming: any;
  theater: any;
  movie: any;
  location: any;
  ticketprice: any;
  totalamount: any;
  email:any;
  name:any;
  constructor(public bookingservice:BookingService,public router:Router) { }

  onselect(){
    this.router.navigate(['/bookings'])
  }
  ngOnInit(): void {
    console.log(this.bookingservice.getemail(),"email")
    const details={
      email:localStorage.getItem('email'),
      name:localStorage.getItem('name')
    }
    this.bookingservice.updatereservation(localStorage.getItem('reservationid'),details).subscribe({next:(res:any)=>{
      if(res && res['status']=='ok'){
        console.log(res)
      }else{
        console.log("ERROR OCCURED in update")
      }
    this.bookingservice.getreservationdetails(localStorage.getItem('reservationid')).subscribe({next:(res:any)=>{
      console.log(res)
      for(let item of res){
      this.seats_booked=item.seats_booked,
      this.seats=item.seats,
      this.showtiming=item.showtiming,
      this.theater=item.theater,
      this.movie=item.movie,
      this.location=item.location,
      this.ticketprice=item.ticketprice,
      this.totalamount=item.totalamount,
      this.email=item.email,
      this.name=item.name
      }
    }})
  }})
  }

}

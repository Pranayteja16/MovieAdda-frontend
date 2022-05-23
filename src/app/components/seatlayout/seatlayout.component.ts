import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})
export class SeatlayoutComponent implements OnInit {

  seats:any=[]
  seats_array:any=[]
  rows:any=[]
  cols:any=[]
  rowname:any=[]
  constructor(public bookingservice:BookingService, public router:Router) { }

  isseatbooked(row:any , col:any) {
    if (this.seats[row][col]==1) {
      return true;
    }
    return null;
  }
  isseatavailable(row:any, col:any) {
    if (this.seats[row][col]==1) {
          return true;
        }
    else if (this.seats[row][col]==-1) {
          return true;
        }
      return false;
  }
  seatSelect(row:any, col:any) {
    if(this.seats[row][col]==1){
      this.seats[row][col]=1
    }
    else if(this.seats[row][col]==-1){
      this.seats[row][col]=0
    }
    else{
    this.seats[row][col]=-1
    }

  }
  public bookseats(): void {
    for(let x of this.rows){
      for(let y of this.cols){
        if(this.seats[x][y]==-1){
          this.seats_array.push([x,y])
        }
      }
    }
    console.log(this.seats_array)
    if (this.seats_array.length<=0) {
      console.log('Please select at least one seat');
      return;
    }
    const seatdetails={
      id:localStorage.getItem('showid'),
      selected_seats:this.seats_array
    }
    this.bookingservice.bookseats(seatdetails).subscribe({next:(res:any)=>{
      console.log(res)
      localStorage.setItem('reservationid', res['data']['_id'])
      // this.bookingservice.setreservationid(res['data']['_id'])
      console.log(this.bookingservice.getreservationid())
      this.router.navigate(['/reservation'])
    },error:(err)=>{
      console.log("Error Occured in bookingseats")
    }
  })
  }

  ngOnInit(): void {

    console.log(this.bookingservice.getshowid())
    this.bookingservice.getshowbyid(localStorage.getItem('showid')).subscribe({next:(res:any)=>{
     console.log(res)
    if(res['status']=='false'){
      console.log("Show not found")
    }else{
      for(let item of res){
        this.seats=item.seats;
      console.log(item.seats)
      }
    }
    }
  })
  this.rowname=['A','B','C','D','E']
  this.rows=[0,1,2,3,4]
  this.cols=[0,1,2,3,4]

}

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/Services/apicall.service';
import { BookingService } from 'src/app/Services/booking.service';
import { TheatersComponent } from '../theaters/theaters.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

movies_list:any=[]
images_list:any=[]
movie:any
location_selected:any=localStorage.getItem('location');

  movieform= new FormGroup({
    title : new FormControl('')
  })

  constructor(public bookingservice:BookingService,public router:Router) { }

  onmovie(){
    console.log(this.movieform.value)
    this.bookingservice.searchmovie(this.movieform.value).subscribe({next:(res) =>{ 
      if(res && res['status']=="ok"){
        console.log("Selected movie is :" , res);
        this.movie=(res['data']['title'])
        console.log("Selected movie :" , this.movie);
        localStorage.setItem('movie',this.movie)
        // this.bookingservice.setmovie(this.movie)
        // this.router.navigate(['/theaters'])

      }else if(res['status']=="false"){
        console.log("Movie not found")
        alert("Movie not found")
    }
    },error:(err)=>{
      console.log("Error Occured")
      alert("Error Occured")
    }
    })
  }

  onimage(str:any){
    console.log(str)
    const imagejson={
      image:str
    }
    console.log(imagejson)
    this.bookingservice.getmoviebyimage(imagejson).subscribe({next:(res:any) =>{ 
      console.log(res)
      for(let item of res){
        this.movie=item.title
        localStorage.setItem('movie',this.movie)
        // this.bookingservice.setmovie(item.title)
        // this.router.navigate(['/theaters'])
      }
    },error:(err)=>{
      console.log("Error Occured")
      alert("Error Occured")
    }
    })
  }

onselect(){
  this.router.navigate(['/theaters'])
}

  ngOnInit(): void {
    this.movies_list=[]
    this.bookingservice.getmovies(localStorage.getItem('location')).subscribe({next:(response:any) =>{ 
      console.log(response)
        for(let movie of response){
          this.movies_list.push(movie.title)
          this.images_list.push(movie.image)
        }
        console.log(this.movies_list)
      }
      })
  }

  get title(){
    return this.movieform.get('title')
  }
}

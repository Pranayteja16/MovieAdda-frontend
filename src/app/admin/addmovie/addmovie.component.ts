import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  locations_list: any=[]
  movies:any=[]
  movieform=new FormGroup({
    location: new FormControl(''),
    title : new FormControl(''),
    image: new FormControl('')
  })

  constructor(public adminservice:AdminService,public router:Router,public notifyservice:NotificationService) { }

  onmovie(){
    this.adminservice.addmovie(this.movieform.value).subscribe({next:(res:any)=>{
      if(res && res['status']=='ok'){
        console.log(res)
        console.log("Added movie: " , res['data']['title'])
        this.movies.push(res['data'])
        this.notifyservice.showSuccess("Movie Added Successfully")
        this.router.navigate(['/addmovie'])
      }else{
        console.log("Error occured in adding movie")
        this.notifyservice.showError("Error Occured")
    
      }
    }
  })
  }
  ondelete(location:any,movie:any){
    try{
      this.adminservice.deletemovie(location,movie).subscribe({next:(res:any)=>{
        if(res && res['status']=='ok'){
        console.log("Deleted Movie succesfully")
        this.notifyservice.showSuccess("Deleted Movie Successfully")
        this.adminservice.allmovies().subscribe({next:(res:any)=>{
          this.movies=res
        }})
        }else{
          console.log("Error occured in deleting movie")
          this.notifyservice.showError("Error Occured")
        }
      }})
    }catch{
      console.log("Error occured")
    }
    try{
      this.adminservice.deletetheaterbylocmov(location,movie).subscribe({next:(res:any)=>{
        if(res && res['status']=='ok'){
        console.log("Deleted Theater succesfully")
        }else{
          console.log("Error occured in deleting theater")
          this.notifyservice.showError("Error Occured")
        }
      }})
    }catch{
      console.log("Error occured")
    }
    try{
      this.adminservice.deleteshowsbylocmov(location,movie).subscribe({next:(res:any)=>{
        if(res && res['status']=='ok'){
        console.log("Deleted Shows succesfully")
        }else{
          console.log("Error occured in deleting shows")
          this.notifyservice.showError("Error Occured")
        }
      }})
    }catch{
      console.log("Error occured")
    }
    try{
      this.adminservice.deletebookingbylocmov(location,movie).subscribe({next:(res:any)=>{
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
  this.adminservice.allmovies().subscribe({next:(res:any)=>{
    this.movies=res
  }})
    }

  get title(){
    return this.movieform.get('title')
  }

}

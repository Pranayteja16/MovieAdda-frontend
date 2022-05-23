import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.css']
})
export class AddlocationComponent implements OnInit {

  locations:any=[]

  addlocationform= new FormGroup({
    location : new FormControl(''),
    image : new FormControl('')
  })

  constructor(public adminservice:AdminService,public router:Router,public notifyservice:NotificationService) { }

  addlocation(){
    
    this.adminservice.addlocation(this.addlocationform.value).subscribe({next:(res) =>{ 

      if(res && res['status']=='ok'){
        console.log(res)
        this.locations.push(res['data'])
        this.notifyservice.showSuccess("Location Added Successfully")
      }else{
        console.log("Error occured in adding location")
        this.notifyservice.showError("Error Occured")
    
      }
    }
  })
}
ondelete(location:any){
  try{
  this.adminservice.deletelocation(location).subscribe({next:(res:any)=>{
    if(res && res['status']=='ok'){
    console.log("Location Deleted succesfully")
    this.notifyservice.showSuccess("Deleted Location Successfully")
    this.adminservice.alllocations().subscribe({next:(res:any)=>{
      this.locations=res
    }})
    }else{
      console.log("Error occured in deleting location")
      this.notifyservice.showError("Error Occured")
    }
  }})
}catch{
  console.log("Error occured")
}
this.adminservice.deletemoviebylocation(location).subscribe({next:(res:any)=>{
  if(res && res['status']=='ok'){
  console.log("Deleted movie succesfully")
  }else{
    console.log("Error occured in deleting movie")
    this.notifyservice.showError("Error Occured")
  }
}})
this.adminservice.deletetheaterbylocation(location).subscribe({next:(res:any)=>{
  if(res && res['status']=='ok'){
  console.log("Deleted theater succesfully")
  }else{
    console.log("Error occured in deleting theater")
    this.notifyservice.showError("Error Occured")
  }
}})
this.adminservice.deleteshowsbylocation(location).subscribe({next:(res:any)=>{
  if(res && res['status']=='ok'){
  console.log("Deleted shows succesfully")
  }else{
    console.log("Error occured in deleting shows")
    this.notifyservice.showError("Error Occured")
  }
}})
this.adminservice.deletebookingbylocation(location).subscribe({next:(res:any)=>{
  if(res && res['status']=='ok'){
  console.log("Deleted bookings succesfully")
  }else{
    console.log("Error occured in deleting bookings")
    this.notifyservice.showError("Error Occured")
  }
}})
}
  ngOnInit(): void {
    this.adminservice.alllocations().subscribe({next:(res:any)=>{
      this.locations=res
    }})

  }

  get location(){
    return this.addlocationform.get('location')
  }

}

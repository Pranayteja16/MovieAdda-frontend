import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { ApicallService } from 'src/app/Services/apicall.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any=[]
  admins:any=[]
  constructor(private adminservice:AdminService,public apicallservice:ApicallService,public router:Router,public notifyservice:NotificationService) { }
  signupform= new FormGroup({
    name :new FormControl(''),
    phoneno : new FormControl(''),
    email :new FormControl(''),
    password : new FormControl('')
  })

  adduser(){
      this.apicallservice.usersignup(this.signupform.value).subscribe({ next: (res)=>{

        if(res && res['status']=='ok' && res['data']['_id']){
          this.notifyservice.showSuccess("User Added Successfully")
          console.log(res)
          this.users.push(res['data'])
      }else if(res['status']=='error'){
        alert("Email already registered, Use different email")
      }
    }, error:(err)=>{
      if(err){
        alert("Error Occured")
      }
      },
    })

    }
  onremove(email:any){
    this.adminservice.deleteuser(email).subscribe({next:(res:any)=>{
      if(res && res['status']=='ok'){
        this.notifyservice.showSuccess("User Removed")
        this.adminservice.allusers().subscribe({next:(res:any)=>{
          console.log(res)
          this.users=[]
          this.admins=[]
          for(let item of res){
            if(item.role=='admin'){
              this.admins.push(item)
            }else{
              this.users.push(item)
            }
          }
          console.log(this.users)
        }})
      }else{
        this.notifyservice.showError("Error Occured")
      }
    }})

  }
  makeadmin(email:any){
    this.adminservice.updateuserrole(email,{role:"admin"}).subscribe({next:(res:any)=>{
      if(res && res['status']=='ok'){
        this.notifyservice.showSuccess("User changed to Admin")
        this.adminservice.allusers().subscribe({next:(res:any)=>{
          console.log(res)
          this.users=[]
          this.admins=[]
          for(let item of res){
            if(item.role=='admin'){
              this.admins.push(item)
            }else{
              this.users.push(item)
            }
          }
          console.log(this.users)
        }})
      }else{
        this.notifyservice.showError("Error Occured")
      }
    }})

  }

  ngOnInit(): void {
    this.adminservice.allusers().subscribe({next:(res:any)=>{
      console.log(res)
      for(let item of res){
        if(item.role=='admin'){
          this.admins.push(item)
        }else{
          this.users.push(item)
        }
      }
      console.log(this.users)
    }})
  }

  get name(){
    return this.signupform.get('name')
  }
  get phoneno(){
    return this.signupform.get('phoneno')
  }
  get email(){
    return this.signupform.get('email')
  }
  get password(){
    return this.signupform.get('password')
  }
}

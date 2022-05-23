import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/Services/apicall.service';
import { BookingService } from 'src/app/Services/booking.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform= new FormGroup({
    email :new FormControl(''),
    password : new FormControl('')
  })
  constructor(public apicallservice:ApicallService,public bookingservice:BookingService, public router:Router,public notifyservice:NotificationService) { }

  login(){
    this.apicallservice.userlogin(this.loginform.value).subscribe({next:(res) =>{ 
      if(res && res['status']=="ok"){
        localStorage.setItem('token' , res['data']['token'])
        localStorage.setItem('refreshtoken' , res['data']['refreshtoken'])
        console.log("Response from API is  " , res)
        console.log(res['data']['existuser']['role'])
        localStorage.setItem('email' , res['data']['existuser']['email'])
        localStorage.setItem('name' , res['data']['existuser']['name'])
        this.apicallservice.login(true)
        this.notifyservice.showSuccess("Login Success")
        if(res['data']['existuser']['role']=="admin"){
          localStorage.setItem( "isadmin" , "true")
          this.apicallservice.setisadmin(true)
          this.router.navigate(['/adminhome'])
        }
        else{
          localStorage.setItem('isadmin' , "false")
          this.apicallservice.setisadmin(false)
          this.router.navigate(['/home']);
        }

      }else if(res['status']=="False"){
        console.log("Entered credentials does not match")
        alert("Entered credentials does not match")
        
      }
    },error:(err)=>{
      console.log("Error Occured in login")
      alert("Error Occured")
    }
    })
  }
  signup(){
    this.router.navigate(['/signup'])
  }


  get email(){
    return this.loginform.get('email')
  }
  get password(){
    return this.loginform.get('password')
  }
  ngOnInit(): void {
  }

}

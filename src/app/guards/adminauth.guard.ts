import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ApicallService } from '../Services/apicall.service';
import { NotificationService } from '../Services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {

  admin:any
  constructor(public router:Router, public apicallservice:ApicallService,public notifyservice:NotificationService){}

  canActivate(){
    if(localStorage.getItem('token')){
      this.apicallservice.adminauthenticate(localStorage.getItem('token')).subscribe({next:(res) =>{
        if(res && res['status']=='ok'){
          console.log(res,"Admin authentication")
          this.apicallservice.admin=true
          return true
        }else if(res['status']=="error"){
          this.apicallservice.renewaccesstoken({refreshtoken:localStorage.getItem("refreshtoken")}).subscribe({next:(response:any)=>{
            console.log(response,"renewaccesstoken response")
            if(response && response['status']=="ok"){
              localStorage.setItem('token',response['data']['accesstoken'])
              return true
            }else{
              this.notifyservice.showError("Access Denied")
              this.router.navigate(['/login'])
              this.apicallservice.userlogout()
              return false
            }
          }})
        }
        else if(res['status']=='notadmin'){
          this.notifyservice.showError("Access Denied")
          this.router.navigate(['/home'])
          return false
        }
      }})
      return true
    }else{
      alert("Please Authenticate")
      this.router.navigate(['/login'])
      return false;
    }

  }
}


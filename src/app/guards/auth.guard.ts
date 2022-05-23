import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApicallService } from '../Services/apicall.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(public router:Router, public apicallservice:ApicallService){}
  canActivate(){
    if(localStorage.getItem('token')){
      this.apicallservice.authenticate(localStorage.getItem('token')).subscribe({next:(res) =>{
        if(res && res['status']=='ok'){
          console.log(res,"accesstoken response")
          this.apicallservice.login(true)
          if(localStorage.getItem("isadmin")=="true"){this.apicallservice.setisadmin(true)}
          return true
        }else{
          if(res['status']=="error"){
            this.apicallservice.renewaccesstoken({refreshtoken:localStorage.getItem("refreshtoken")}).subscribe({next:(response:any)=>{
              console.log(response,"renewaccesstoken response")
              if(response && response['status']=="ok"){
                localStorage.setItem('token',response['data']['accesstoken'])
                return true
              }else{
                alert("Please Authenticate")
                this.router.navigate(['/login'])
                this.apicallservice.userlogout()
                return false
              }
            }})
          }
        }
      }
      })
      return true
    }else{
      this.router.navigate(['/login'])
      return false;
    }

  }
}

import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ApicallService } from './apicall.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let auth = this.injector.get(ApicallService)
    console.log("Intercepted");
      let tokenizedReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${auth.gettoken()}`
        }
      })
      return next.handle(tokenizedReq)
  }
}
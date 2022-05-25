import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  email:any
  name:any
  location:any
  movie:any
  theater:any
  showid:any
  reservationid:any

  constructor(public http : HttpClient) { }

getalllocations(){
    return this.http.get('http://localhost:9000/location/alllocations')
  }
searchlocation(userdata:any){
  return this.http.post('http://localhost:9000/location/searchlocation' , userdata)
}

searchmovie(userdata:any){
  return this.http.post('http://localhost:9000/movie/searchmovie', userdata)
}
getmoviebyimage(image:any){
  return this.http.post('http://localhost:9000/movie/getmoviebyimage', image)
}

getmovies(location:any){
  return this.http.get('http://localhost:9000/movie/getmovie/'+location)
}

searchtheater(userdata:any){
  return this.http.post('http://localhost:9000/theater/searchtheater' , userdata)
}

gettheaters(movie:any, location:any){
  return this.http.get('http://localhost:9000/theater/gettheater/'+ movie+'/'+location)
}

getshows(the:any , mov:any , loc:any){
  return this.http.get('http://localhost:9000/showtime/getshowtime/'+mov+'/'+the+'/'+loc)
}
getshow(mov:any, the:any ,loc:any, show:any){
  return this.http.get('http://localhost:9000/showtime/getshowtiming/'+mov+'/'+the+'/'+loc+'/'+show)
}
getshowbyid(id:any){
  return this.http.get('http://localhost:9000/showtime/getshow/'+id)
}
searchshow(userdata:any){
  return this.http.post('http://localhost:9000/showtime/searchshowtime' , userdata)
}
bookseats(userdata:any){
  return this.http.post('http://localhost:9000/showtime/bookseats' , userdata)
}
getreservationdetails(id:any){
  return this.http.get('http://localhost:9000/reservation/getreservationdetails/'+ id)
}
getreservations(email:any){
  return this.http.get('http://localhost:9000/reservation/getreservationbyemail/'+ email)
}




getemail(){
  return this.email
}

setemail(obj:any){
  this.email=obj
}

getname(){
  return this.name
}

setname(obj:any){
  this.name=obj
}

getlocation(){
  return this.location
}

setlocation(obj:any){
  this.location=obj
}
getmovie(){
  return this.movie
}

setmovie(obj:any){
  this.movie=obj
}
gettheater(){
  return this.theater
}
settheater(obj:any){
  this.theater=obj
}
getshowid(){
  return this.showid
}
setshowid(obj:any){
  this.showid=obj
}
getreservationid(){
  return this.reservationid
}
setreservationid(obj:any){
  this.reservationid=obj
}

}

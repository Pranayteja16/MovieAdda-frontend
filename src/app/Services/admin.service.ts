import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor(public http : HttpClient) { }

  allusers(){
    return this.http.get('http://65.0.55.230:9000/users/allusers')
  }
 
  deleteuser(email:any){
    return this.http.delete('http://65.0.55.230:9000/users/deleteuser/'+email )
  }
  addlocation(userdata:any){
    return this.http.post('http://65.0.55.230:9000/location/addlocation' , userdata)
  }
  getlocations(){
    return this.http.get('http://65.0.55.230:9000/location/alllocations')
  }
  addmovie(userdata:any){
    return this.http.post('http://65.0.55.230:9000/movie/addmovie', userdata)
  }
  addtheater(userdata:any){
    return this.http.post('http://65.0.55.230:9000/theater/addtheater' , userdata)
  }
  addshowtime(userdata:any){
    return this.http.post('http://65.0.55.230:9000/showtime/addshowtime' , userdata)
  }
  alllocations(){
    return this.http.get('http://65.0.55.230:9000/location/alllocations')
  }
  allmovies(){
    return this.http.get('http://65.0.55.230:9000/movie/allmovies')
  }
  alltheaters(){
    return this.http.get('http://65.0.55.230:9000/theater/alltheaters')
  }
  allshows(){
    return this.http.get('http://65.0.55.230:9000/showtime/allshows')
  }
  allbookings(){
    return this.http.get('http://65.0.55.230:9000/reservation/allreservations')
  }
  deletelocation(location:any){
    return this.http.delete('http://65.0.55.230:9000/location/deletelocation/'+location )
  }
  deletemovie(location:any,movie:any){
    return this.http.delete('http://65.0.55.230:9000/movie/deletemovie/'+location+'/'+movie)
  }
  deletemoviebylocation(location:any){
    return this.http.delete('http://65.0.55.230:9000/movie/deletemovie/'+location)
  }
  deletetheater(location:any,movie:any,theater:any){
    return this.http.delete('http://65.0.55.230:9000/theater/deletetheater/'+location+'/'+movie+'/'+theater)
  }
  deletetheaterbylocmov(location:any,movie:any){
    return this.http.delete('http://65.0.55.230:9000/theater/deletetheater/'+location+'/'+movie)
  }
  deletetheaterbylocation(location:any){
    return this.http.delete('http://65.0.55.230:9000/theater/deletetheater/'+location)
  }
  deleteshows(location:any,movie:any,theater:any,show:any){
    return this.http.delete('http://65.0.55.230:9000/showtime/deleteshowtime/'+location+'/'+movie+'/'+theater+'/'+show)
  }
  deleteshowsbylocmovthe(location:any,movie:any,theater:any){
    return this.http.delete('http://65.0.55.230:9000/showtime/deleteshowtime/'+location+'/'+movie+'/'+theater)
  }
  deleteshowsbylocmov(location:any,movie:any){
    return this.http.delete('http://65.0.55.230:9000/showtime/deleteshowtime/'+location+'/'+movie)
  }
  deleteshowsbylocation(location:any){
    return this.http.delete('http://65.0.55.230:9000/showtime/deleteshowtime/'+location)
  }
  deletebooking(location:any,movie:any,theater:any,show:any,seats:any){
    return this.http.delete('http://65.0.55.230:9000/reservation/deletereservation/'+location+'/'+movie+'/'+theater+'/'+show+'/'+seats)
  }
  deletebookingbylocmovtheshow(location:any,movie:any,theater:any,show:any){
    return this.http.delete('http://65.0.55.230:9000/reservation/deletereservation/'+location+'/'+movie+'/'+theater+'/'+show)
  }
  deletebookingbylocmovthe(location:any,movie:any,theater:any){
    return this.http.delete('http://65.0.55.230:9000/reservation/deletereservation/'+location+'/'+movie+'/'+theater)
  }
  deletebookingbylocmov(location:any,movie:any){
    return this.http.delete('http://65.0.55.230:9000/reservation/deletereservation/'+location+'/'+movie)
  }
  deletebookingbylocation(location:any){
    return this.http.delete('http://65.0.55.230:9000/reservation/deletereservation/'+location)
  }

  
}

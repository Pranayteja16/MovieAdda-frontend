import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name:any=localStorage.getItem("name")
  constructor(public router:Router) { }
login(){
  this.router.navigate(['/login'])
}
signup(){
  this.router.navigate(['/signup'])
}
  ngOnInit(): void {
  }

}

import { Component } from '@angular/core';
import { ApicallService } from './Services/apicall.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie_Ticket_Booking';

  constructor(public apiservice:ApicallService){}
}

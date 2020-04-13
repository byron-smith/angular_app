import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title ='Patient Inquiry Management';
  //declare variable to hold response and make it public to be accessible from components.html

  ngOnInit(): void {
  }
}
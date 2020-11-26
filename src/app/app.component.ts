import { Component, OnInit } from '@angular/core';
import { AppHttpService } from './services/app-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'bTob';
  
  constructor() { }

  ngOnInit(): void {
   
  }
}

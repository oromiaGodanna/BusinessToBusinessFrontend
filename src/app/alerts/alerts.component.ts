import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'; // import router from angular router

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.sass']
})
export class AlertsComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }
  alert;
  successResult=false;
  errorResult=false;
  message;
  route;
  ngOnInit(): void {

    this.router.paramMap.subscribe(params => {
      var type = params.get('type');
      this.route = params.get('route');
      var messageParams = params.get('message');
      this.message = messageParams;
      if(type == 'success'){
        this.successResult=true;
      }else{
        this.errorResult=true;
      }
      
    });

  }

}

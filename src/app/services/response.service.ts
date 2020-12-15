import { Injectable } from '@angular/core';
import { Response } from '../models/response';
import { Proforma } from '../models/proforma';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http:HttpClient) { }

  sendResponse(response){
    return this.http.post('http://localhost:3000/proforma/sendResponse/', response);
  }

  getResponses(itemId){
    return this.http.get('http://localhost:3000/proforma/getResponses/'+itemId);
  }

  getProformaResponses(proformaId){
    return this.http.get('http://localhost:3000/proforma/getProformaResponses/'+proformaId);
  }

  getResponse(responseId){
    return this.http.get('http://localhost:3000/proforma/getResponse/'+responseId);
  }

}

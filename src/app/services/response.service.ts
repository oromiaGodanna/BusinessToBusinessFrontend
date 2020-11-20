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
    return this.http.post('http://localhost:3000/api/sendResponse/', response);
  }

  getResponses(itemId){
    return this.http.get('http://localhost:3000/api/getResponses/'+itemId);
  }

  getProformaResponses(proformaId){
    return this.http.get('http://localhost:3000/api/getProformaResponses/'+proformaId);
  }

  getResponse(responseId){
    return this.http.get('http://localhost:3000/api/getResponse/'+responseId);
  }

}

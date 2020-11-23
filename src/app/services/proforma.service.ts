import { Injectable } from '@angular/core';
import { Proforma } from '../models/proforma';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProformaService {

  constructor(private http:HttpClient) { }

  createProforma(proforma: Proforma){
    return this.http.post('http://localhost:3000/proforma/createProforma/', proforma);
  }

  requestProforma(proformaId,proformaData){
    return this.http.post('http://localhost:3000/proforma/requestProforma/'+proformaId, proformaData);
  }

  getProforma(proformaId){
    return this.http.get('http://localhost:3000/proforma/getProforma/'+proformaId);
  }

  getProformas(): Observable<Proforma[]>{
    return this.http.get<Proforma[]>('http://localhost:3000/proforma/getProformas');
  }

  getMyProformas(): Observable<Proforma[]>{
    return this.http.get<Proforma[]>('http://localhost:3000/proforma/getMyProformas');
  }
 
  closeProforma(proformaId){
    return this.http.get('http://localhost:3000/proforma/closeProforma/'+proformaId);
  }
  

  deleteProforma(proformaId){
    return this.http.delete('http://localhost:3000/proforma/deleteProforma/'+proformaId);
  }

  pendingProformas(): Observable<Proforma[]>{
    return this.http.get<Proforma[]>('http://localhost:3000/proforma/pendingProforma');
  }

  activeProformas(): Observable<Proforma[]>{
    return this.http.get<Proforma[]>('http://localhost:3000/proforma/activeProforma');
  }
  
  closedProformas(): Observable<Proforma[]>{
    return this.http.get<Proforma[]>('http://localhost:3000/proforma/closedProforma');
  }

}

import { Injectable } from '@angular/core';
import { SpecialOffer } from '../models/specialOffer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialofferService {

  constructor(private http:HttpClient) { }

  addSpecialOffer(product: SpecialOffer){
    return this.http.post('http://localhost:3000/api/createSpecialOffer/', product);
  }

  getPendingSpecialOffers(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/api/getPendingSpecialOffer');
  }

  getAllActiveSpecialOffers(): Observable<any[]>{
    return this.http.get<SpecialOffer[]>('http://localhost:3000/api/getAllActiveSpecialOffer');
  }

   getActiveSpecialOffers(offset,limit): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/api/getActiveSpecialOffer/'+offset+'/'+limit);
  }

  getMyActiveSpecialOffer(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/api/getMyActiveSpecialOffer');
  }

  openSpecialOffer(specialOfferId,specialOffer){
    return this.http.post('http://localhost:3000/api/openSpecialOffer/'+specialOfferId,specialOffer);
  }

  deleteSpecialOffer(productId){
    return this.http.delete('http://localhost:3000/api/deleteOffer/'+productId);
  }
  deleteProduct(productId){
    return this.http.delete('http://localhost:3000/api/deleteProduct/'+productId);
  }

  getAllActiveSpecialOffersByProductCategory(productCategory): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/api/getAllActiveSpecialOfferByCategory/'+productCategory);
  }
  getAllActiveSpecialOffersByProductSubCategory(productSubCategory): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/api/getAllActiveSpecialOfferBySubCategory/'+productSubCategory);
  }

  getActiveSpecialOffersByProductCategory(productCategory,offset,limit): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/api/getActiveSpecialOfferByCategory/'+productCategory+'/'+offset+'/'+limit);
  }
  getActiveSpecialOffersByProductSubCategory(productSubCategory,offset,limit): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/api/getActiveSpecialOfferBySubCategory/'+productSubCategory+'/'+offset+'/'+limit);
  }


  getSpecialOfferProduct(productId){
    return this.http.get('http://localhost:3000/api/getProductInSpecialOffer/'+productId);
  }
}

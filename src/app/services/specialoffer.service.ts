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
    return this.http.post('http://localhost:3000/specialOffer/createSpecialOffer/', product);
  }

  getPendingSpecialOffers(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/specialOffer/getPendingSpecialOffer');
  }

  getAllActiveSpecialOffers(): Observable<any[]>{
    return this.http.get<SpecialOffer[]>('http://localhost:3000/specialOffer/getAllActiveSpecialOffer');
  }

   getActiveSpecialOffers(offset,limit): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/specialOffer/getActiveSpecialOffer/'+offset+'/'+limit);
  }

  getMyActiveSpecialOffer(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/specialOffer/getMyActiveSpecialOffer');
  }

  openSpecialOffer(specialOfferId,specialOffer){
    return this.http.post('http://localhost:3000/specialOffer/openSpecialOffer/'+specialOfferId,specialOffer);
  }

  deleteSpecialOffer(productId){
    return this.http.delete('http://localhost:3000/specialOffer/deleteOffer/'+productId);
  }
  deleteProduct(productId){
    return this.http.delete('http://localhost:3000/specialOffer/deleteProduct/'+productId);
  }

  getAllActiveSpecialOffersByProductCategory(productCategory): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/specialOffer/getAllActiveSpecialOfferByCategory/'+productCategory);
  }
  getAllActiveSpecialOffersByProductSubCategory(productSubCategory): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/specialOffer/getAllActiveSpecialOfferBySubCategory/'+productSubCategory);
  }

  getActiveSpecialOffersByProductCategory(productCategory,offset,limit): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/specialOffer/getActiveSpecialOfferByCategory/'+productCategory+'/'+offset+'/'+limit);
  }
  getActiveSpecialOffersByProductSubCategory(productSubCategory,offset,limit): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/specialOffer/getActiveSpecialOfferBySubCategory/'+productSubCategory+'/'+offset+'/'+limit);
  }


  getSpecialOfferProduct(productId){
    return this.http.get('http://localhost:3000/specialOffer/getProductInSpecialOffer/'+productId);
  }
}

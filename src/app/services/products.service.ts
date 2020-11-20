import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts(offset,limit): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/getProducts/'+offset+'/'+limit);
  }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/getAllProducts');
  }

  getProduct(productId): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/getProduct/'+productId);
  }

  getAllRelatedProductByCategory(productCategory): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/getAllRelatedProductByCategory/'+productCategory);
  }

  getRelatedProductByCategory(productCategory,offset,limit): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/getRelatedProductByCategory/'+productCategory+'/'+offset+'/'+limit);
  }

  getAllRelatedProductBySubCategory(productSubCategory): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/getAllRelatedProductBySubCategory/'+productSubCategory);
  }

  getRelatedProductBySubCategory(productSubCategory,offset,limit): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/getRelatedProductBySubCategory/'+productSubCategory+'/'+offset+'/'+limit);
  }

  addProduct(product){
    return this.http.post('http://localhost:3000/api/createProduct/', product);
  }

  removeProduct(productId){
    return this.http.delete('http://localhost:3000/api/deleteProduct/'+productId);
  }

  editProduct(productId,product){
    return this.http.post('http://localhost:3000/api/updateProduct/'+productId, product);
  }

  searchProduct(searchWord,offset,limit): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/search/'+searchWord + '/'+offset+'/'+limit);
  }
  filterProducts(filterObj,offset,limit): Observable<Product[]>{
    return this.http.post<Product[]>('http://localhost:3000/api/filter/'+offset+'/'+limit,filterObj);
  }
}

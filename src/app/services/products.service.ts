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
    return this.http.get<Product[]>('http://localhost:3000/product/getProducts/'+offset+'/'+limit);
  }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/product/getAllProducts');
  }

  getProduct(productId): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/product/getProduct/'+productId);
  }

  getAllRelatedProductByCategory(productCategory): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/product/getAllRelatedProductByCategory/'+productCategory);
  }

  getRelatedProductByCategory(productCategory,offset,limit): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/product/getRelatedProductByCategory/'+productCategory+'/'+offset+'/'+limit);
  }

  getAllRelatedProductBySubCategory(productSubCategory): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/product/getAllRelatedProductBySubCategory/'+productSubCategory);
  }

  getRelatedProductBySubCategory(productSubCategory,offset,limit): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/product/getRelatedProductBySubCategory/'+productSubCategory+'/'+offset+'/'+limit);
  }

  addProduct(product){
    return this.http.post('http://localhost:3000/product/createProduct/', product);
  }

  removeProduct(productId){
    return this.http.delete('http://localhost:3000/product/deleteProduct/'+productId);
  }

  editProduct(productId,product){
    return this.http.post('http://localhost:3000/product/updateProduct/'+productId, product);
  }

  searchProduct(searchWord,offset,limit): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/product/search/'+searchWord + '/'+offset+'/'+limit);
  }
  filterProducts(filterObj,offset,limit): Observable<Product[]>{
    return this.http.post<Product[]>('http://localhost:3000/product/filter/'+offset+'/'+limit,filterObj);
  }
}

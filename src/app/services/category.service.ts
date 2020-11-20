import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:3000/api/getCategories');
  }

  addCategory(category){
    return this.http.post('http://localhost:3000/api/addCategory/',category);
  }

  deleteCategory(categoryId){
    return this.http.delete('http://localhost:3000/api/deleteCategory/'+categoryId);
  }

  getCategory(categoryId):Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:3000/api/getCategory/'+categoryId);
  }

  editCategory(categoryId,category){
    return this.http.post('http://localhost:3000/api/editCategory/'+categoryId, category);
  }

}

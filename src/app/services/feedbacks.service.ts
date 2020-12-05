import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {
  uri = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  addRating(rating): any{
    return this.http.post<any>(`${this.uri}/rating/addRating`, rating);

  }
  //for a given Product

  getRating(productId): any{
    return this.http.get<any>(`${this.uri}/rating/getRating${productId}`);

  }
  //for a given order

  getOneRating(orderId): any{
    return this.http.get<any>(`${this.uri}/rating/getOneRating${orderId}`);
  }

  addReview(review): any{
    return this.http.post<any>(`${this.uri}/review/addReview`, review);

  }
  //for a given Product
  getReview(productId): any{
    return this.http.get<any>(`${this.uri}/review/getReview${productId}`);

  }
  //for a given order
  getOneReview(orderId): any{
    return this.http.get<any>(`${this.uri}/review/getOneReview${orderId}`);
  }
}

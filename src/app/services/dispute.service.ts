import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisputeService {
  uri = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  createDispute(newDispute):any {
    return this.http.post<any>(`${this.uri}/order/openDispute`, newDispute);
  }
  
  getDispute(disputeId): any{
    return this.http.get<any>(`${this.uri}/dispute/getDispute/${disputeId}`);

  }
  getDisputes(disputeIds): any{
    return this.http.get<any>(`${this.uri}/dispute/getDisputes/`, disputeIds);

  }
  cancelDispute(disputeId):any{
    return this.http.put<any>(`${this.uri}/order/cancelDispute/${disputeId}`, {});

  }
  closeDispute(disputeId):any{
    return this.http.put<any>(`${this.uri}/order/closeDispute/${disputeId}`, {});
  }
  
}

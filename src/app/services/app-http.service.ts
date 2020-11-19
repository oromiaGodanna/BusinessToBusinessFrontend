import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  apiUrl: string = '/localhost:3000';

headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

// getHeaders(){
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   return headers;
// }
// httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

// getRequestOptions(): RequestOptions {
//   const options = new RequestOptions();
//   options.headers = this.getHeaders();
//   return options;
// }

  constructor(private http: HttpClient) { }

  get(url: string){
    return this.http.get(url, { 'headers': this.headers });
  }

  post(url:string, data: any){
    return this.http.post(url, data);
  }

  put(url:string, data:any){
    return this.http.put(url,data);
  }

  delete(url:string, id:string){
    return this.http.delete(url+'/'+id);
  }

  getHello(){
    return this.http.get('/api/hello');
  }
  
}

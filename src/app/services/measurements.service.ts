import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Measurement } from '../models/measurement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  constructor(private http:HttpClient) { }

  getMeasurements(){
    return this.http.get('http://localhost:3000/api/getMeasurements');
  }

  addMeasurement(measurement){
    return this.http.post('http://localhost:3000/api/addMeasurement/',measurement);
  }

  deleteMeasurement(measurementId){
    return this.http.delete('http://localhost:3000/api/deleteMeasurement/'+measurementId);
  }

  getMeasurement(measurementId){
    return this.http.get('http://localhost:3000/api/getMeasurement/'+measurementId);
  }

  editMeasurement(measurementId,measurement){
    return this.http.post('http://localhost:3000/api/editMeasurement/'+measurementId, measurement);
  }

}

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:5000';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }


  post(URL: string, data: any): Observable<any> {
    return this.httpClient.post(`${baseURL}/${URL}`, data);
  }

  get(URL: string): Observable<any> {
    return this.httpClient.get(`${baseURL}/${URL}`);
  }

  put(URL: string, id: number, data: any): Observable<any> {
    return this.httpClient.put(`${`${baseURL}/${URL}`}/${id}`, data);
  }

  delete(URL: string, id: number): Observable<any> {
    return this.httpClient.delete(`${`${baseURL}/${URL}`}/${id}`);
  }

}

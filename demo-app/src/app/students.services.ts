import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Students {
  private apiUrl = 'https://freetestapi.com/api/v1/students'; 

  constructor(private http: HttpClient) { }
  
  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

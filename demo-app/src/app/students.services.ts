import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Students {
  private apiUrl = 'https://freetestapi.com/api/v1/students'; 
  private studentsData = new BehaviorSubject<any[]>([]);
  currentStudents = this.studentsData.asObservable();

  constructor(private http: HttpClient) { 
    this.loadInitialData();
  }
  
  loadInitialData(): void {
    const storedData = localStorage.getItem('studentsData');
    if (storedData) {
      this.studentsData.next(JSON.parse(storedData));
    } else {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.studentsData.next(response);
        localStorage.setItem('studentsData', JSON.stringify(response));
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  addStudent(student: any): void {
    const currentStudents = this.studentsData.value;
    this.studentsData.next([student, ...currentStudents]);
    localStorage.setItem('studentsData', JSON.stringify(this.studentsData.value));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    const largestId = currentStudents.reduce((maxId: number, s: any) => {
        return Math.max(maxId, s.id || 0);
    }, 0);
    console.log("Largest ID:", largestId);
    const newStudent = { ...student, id: largestId + 1 };
    console.log("New Student:", newStudent);
    this.studentsData.next([newStudent, ...currentStudents]);
    localStorage.setItem('studentsData', JSON.stringify(this.studentsData.value));
  }
}

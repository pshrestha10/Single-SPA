import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { Students } from '../students.services';

@Component({
  selector: 'demo-app-table',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  columnDefs = [
    { headerName: 'Serial Number', valueGetter: 'node.rowIndex + 1' },
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'gpa', headerName: 'GPA' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'actions', headerName: 'Actions' }
  ];

  rowData: any[] = []; 
  constructor(private students: Students) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('studentsData');
    if (storedData) {
      this.rowData = JSON.parse(storedData);
    } else {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.students.fetchData().subscribe(
      (response: any[]) => {
        this.rowData = response;
        localStorage.setItem('studentsData', JSON.stringify(this.rowData));
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
}
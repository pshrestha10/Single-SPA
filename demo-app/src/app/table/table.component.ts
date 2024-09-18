import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { Students } from '../students.services';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'demo-app-table',
  standalone: true,
  imports: [AgGridModule, DialogComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableComponent implements OnInit {
  columnDefs = [
    { headerName: 'S N', valueGetter: 'node.rowIndex + 1', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'gpa', headerName: 'GPA', flex: 1, sortable: true,},
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'actions', headerName: 'Actions', flex: 1 }
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

  // applyFilter(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   const filterValue = input.value.trim().toLowerCase();
  //   this.storedData.filterPredicate = (data: any, filter: string) => {
  //     return data.name.toLowerCase().includes(filter);
  //   };
  //   this.storedData.filter = filterValue;
  // }
  // addStudent(){
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     data: { showChart: 0 },
  //     width: '80%',
  //     height: '80%',
  //   });
  //   dialogRef.afterClosed().subscribe((newStudent: any) => {
  //     if (newStudent) {
  //       this.rowData = [newStudent, ...this.rowData];
  //       localStorage.setItem('studentsData', JSON.stringify(this.rowData));
  //     }
  //   });
  // }
}
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { Students } from '../students.services';
import { DialogComponent } from '../dialog/dialog.component';
import { PaginationNumberFormatterParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'demo-app-table',
  standalone: true,
  imports: [AgGridModule, DialogComponent,CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableComponent implements OnInit {
  private gridApi: any;
  public paginationPageSize = 10;
  public paginationPageSizeSelector:  number[] = [5, 10, 20, 40];;
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams,
  ) => string = (params: PaginationNumberFormatterParams) => {
    return params.value.toLocaleString();
  };
  columnDefs = [
    { headerName: 'S N', valueGetter: 'node.rowIndex + 1', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'gpa', headerName: 'GPA', flex: 1, sortable: true,},
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    {
      headerName: 'Actions',
      flex: 1,
      cellRenderer: (params: any) => {
        return `
            <en-button class="edit-btn" onclick="editStudent(${params.data.id})"><en-icon-edit></en-button>
            <en-button class="delete-btn" onclick="deleteStudent(${params.data.id})"><en-icon-delete></en-button>
        `;
      },
    }    
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
  refreshData(): void {
    this.rowData = [];
    this.fetchData();
  }

  onGridReady(params: any): void {
    this.gridApi = params.api; 
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    
    this.gridApi.setQuickFilter(filterValue); 
  }

  
  deleteStudent(id: any): void {
    console.log(id);
    this.rowData = this.rowData.filter(s => s.id !== id);
    this.rowData = [...this.rowData];
    localStorage.setItem('studentsData', JSON.stringify(this.rowData));
  }

  // onPageSizeChange(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   this.paginationPageSize = Number(selectElement.value);
  //   if (this.gridApi) {
  //     this.gridApi.paginationSetPageSize(this.paginationPageSize);
  //   }
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
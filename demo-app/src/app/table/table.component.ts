import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { Students } from '../students.services';
import { DialogComponent } from '../dialog/dialog.component';
import { PaginationNumberFormatterParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'demo-app-table',
  standalone: true,
  imports: [AgGridModule, DialogComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
}) 
export class TableComponent implements OnInit {
  private gridApi: any;
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] = [10, 20, 40];
  public paginationNumberFormatter: (params: PaginationNumberFormatterParams) => string = (params: PaginationNumberFormatterParams) => {
    return params.value.toLocaleString();
  };

  rowData: any[] = [];
  filteredRowData: any[] = [];

  @Input() set data(value: any[]) {
    this.rowData = value;
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }

  @Input() set clickedData(value: any[]) {
    if (value.length > 0) {
      const { name } = value[0];
      console.log('Filtering by:', name);
      this.filteredRowData = this.rowData.filter(student => student.gender === name || student.gpa.toString() === name);
    } else {
      this.filteredRowData = this.rowData;
    }
    if (this.gridApi) {
      this.gridApi.setRowData(this.filteredRowData);
    }
  }

  columnDefs = [
    { headerName: 'S N', valueGetter: 'node.rowIndex + 1', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'gpa', headerName: 'GPA', flex: 1, sortable: true },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    {
      headerName: 'Actions',
      flex: 1,
      cellRenderer: (params: any) => {
        const editButton = document.createElement('en-button');
        editButton.innerHTML = `<en-icon-edit></en-icon-edit> Edit`;
        editButton.className = 'edit-btn';
        editButton.onclick = () => this.editStudent(params.data.id);

        const deleteButton = document.createElement('en-button');
        deleteButton.innerHTML = `<en-icon-delete></en-icon-delete> Delete`;
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => this.deleteStudent(params.data.id);

        const container = document.createElement('div');
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        return container;
      },
    },
  ];

  constructor(private studentsService: Students) {}

  ngOnInit(): void {
    this.studentsService.currentStudents.subscribe(data => {
      this.rowData = data;
      this.filteredRowData = data; 
    });
    
  }

  refreshData(): void {
    this.studentsService.fetchData();
  }

  deleteStudent(id: any): void {
    const currentStudents = JSON.parse(localStorage.getItem('studentsData') || '[]');
    const updatedStudents = currentStudents.filter((student: any) => student.id !== id);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
    
    this.rowData = updatedStudents;
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData); 
    }
  }

  editStudent(id: any): void {}

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.gridApi.setQuickFilter(filterValue); 
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    params.api.setRowData(this.rowData);
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.paginationPageSize = Number(selectElement.value);
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(this.paginationPageSize);
    }
  }
}
